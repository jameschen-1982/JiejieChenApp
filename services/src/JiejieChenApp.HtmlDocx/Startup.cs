using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.SimpleNotificationService;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace JiejieChenApp.HtmlDocx;

[Amazon.Lambda.Annotations.LambdaStartup]
public class Startup
{
    /// <summary>
    /// Services for Lambda functions can be registered in the services dependency injection container in this method. 
    ///
    /// The services can be injected into the Lambda function through the containing type's constructor or as a
    /// parameter in the Lambda function using the FromService attribute. Services injected for the constructor have
    /// the lifetime of the Lambda compute container. Services injected as parameters are created within the scope
    /// of the function invocation.
    /// </summary>
    public void ConfigureServices(IServiceCollection services)
    {
        #region Configuration setup
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", false)
            .AddEnvironmentVariables();
        var configuration = builder.Build();
        services.AddSingleton<IConfiguration>(configuration);
        #endregion
        
        services.AddLogging(loggingBuilder =>
            loggingBuilder.AddSerilog(new LoggerConfiguration().ReadFrom.Configuration(configuration).CreateLogger(), dispose: true));

        
        services.AddAWSService<IAmazonSimpleNotificationService>();
        services.AddDefaultAWSOptions(configuration.GetAWSOptions());

        #region DynamoDB setup
        var dynamoDbConfig = configuration.GetSection("DynamoDb");
        var runLocalDynamoDb = dynamoDbConfig.GetValue<bool>("LocalMode");
        if (runLocalDynamoDb)
        {
            services.AddSingleton<IAmazonDynamoDB>(sp =>
            {
                var clientConfig = new AmazonDynamoDBConfig { ServiceURL = dynamoDbConfig.GetValue<string>("LocalServiceUrl") };
                return new AmazonDynamoDBClient(clientConfig);
            });
        }
        else
        {
            services.AddAWSService<IAmazonDynamoDB>();
        }
        services.AddTransient<IDynamoDBContext, DynamoDBContext>(sp =>
        {
            var client = sp.GetService<IAmazonDynamoDB>();
            var dynamoDbContextConfig = new DynamoDBContextConfig
            {
                TableNamePrefix = dynamoDbConfig.GetValue<string>("TableNamePrefix")
            };
            return new DynamoDBContext(client, dynamoDbContextConfig);
        });
        #endregion
        
        services.AddAWSService<Amazon.S3.IAmazonS3>();
        services.AddSingleton(TimeProvider.System);
    }
}
