using Amazon.SimpleNotificationService;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Scrutor;

namespace JiejieChenApp.Extensions
{
    public static class NetCoreDiSetupExtensions
    {
        public static void RegisterServiceLayerDi(this IServiceCollection services)
        {
            services.Scan(scan => scan
                .FromAssemblies(Assembly.GetAssembly(typeof(Startup)))
                .AddClasses(classes => classes.Where(c => c.Name.EndsWith("Service")))
                .UsingRegistrationStrategy(RegistrationStrategy.Skip)
                .AsImplementedInterfaces()
                .WithTransientLifetime());
        }

        public static void RegisterAwsServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAWSService<IAmazonSimpleNotificationService>(ServiceLifetime.Transient);
        }
    }
}
