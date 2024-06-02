using System.Net;
using System.Text.Json;
using Amazon.Lambda.Annotations;
using Amazon.Lambda.Annotations.APIGateway;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Amazon.S3;
using Amazon.S3.Model;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using HtmlToOpenXml;


// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace JiejieChenApp.HtmlDocx;

public class Functions
{
    private readonly IAmazonS3 _amazonS3;
    private readonly TimeProvider _timeProvider;

    public Functions(IAmazonS3 amazonS3, TimeProvider timeProvider)
    {
        _amazonS3 = amazonS3;
        _timeProvider = timeProvider;
    }

    [LambdaFunction]
    public async Task<APIGatewayHttpApiV2ProxyResponse> Handler(ILambdaContext context)
    {
        // return await DocxFromHtml();
        return await DocxFromS3();
    }

    private async Task<APIGatewayHttpApiV2ProxyResponse> DocxFromS3()
    {
        var preSignedUrlRequest = new GetPreSignedUrlRequest
        {
            BucketName = "c2j",
            Key = "resume/JCHEN SEEK Resume.docx",
            Expires = _timeProvider.GetUtcNow().AddMinutes(10).DateTime
        };

        string preSignedUrl = await _amazonS3.GetPreSignedURLAsync(preSignedUrlRequest);

        return new APIGatewayHttpApiV2ProxyResponse
        {
            StatusCode = 302,
            Headers = new Dictionary<string, string>
            {
                { "Location", preSignedUrl }
            }
        };
    }

    private static async Task<APIGatewayHttpApiV2ProxyResponse> DocxFromHtml()
    {
        System.Diagnostics.Debug.WriteLine("Lambda start");
        // Create a request using a URL that can receive a post.
        using var httpClient = new HttpClient();
        var requestUri = "http://localhost:4200";
        await using var dataStream = httpClient.GetStreamAsync(requestUri).Result;

        // Open the stream using a StreamReader for easy access.
        var reader = new StreamReader(dataStream);
        // Read the content.
        // var html = await reader.ReadToEndAsync();
        var html = "<h1 style=\"color: read\">Hello world</h1>";
        System.Diagnostics.Debug.WriteLine("Downloaded HTML");

        using (MemoryStream generatedDocument = new MemoryStream())
        {
            generatedDocument.Position = 0L;
            using (WordprocessingDocument package = WordprocessingDocument.Create(generatedDocument, WordprocessingDocumentType.Document))
            {
                MainDocumentPart mainPart = package.MainDocumentPart;
                if (mainPart == null)
                {
                    mainPart = package.AddMainDocumentPart();
                    new Document(new Body()).Save(mainPart);
                }

                HtmlConverter converter = new HtmlConverter(mainPart);
                Body body = mainPart.Document.Body;

                System.Diagnostics.Debug.WriteLine("Before Parse HTML");
                converter.ParseHtml(html);
                System.Diagnostics.Debug.WriteLine("After parse HTML");
                mainPart.Document.Save();
                System.Diagnostics.Debug.WriteLine("After Save Document");
            }
            
            var base64 = Convert.ToBase64String(generatedDocument.ToArray());
            return new APIGatewayHttpApiV2ProxyResponse
            {
                StatusCode = (int)HttpStatusCode.OK, 
                IsBase64Encoded = true,
                Body = base64,
                Headers = new Dictionary<string, string>
                {
                    { "Content-Type", "application/docx" },
                    { "Content-disposition", "attachment;filename=\"james_chen_cv.docx\""}
                }
            };
        }
    }
}
