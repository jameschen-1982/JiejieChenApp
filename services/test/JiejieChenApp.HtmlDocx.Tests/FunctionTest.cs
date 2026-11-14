using Xunit;
using Amazon.Lambda.Core;
using Amazon.Lambda.TestUtilities;
using Amazon.S3;
using Amazon.S3.Model;
using FluentAssertions;
using Moq;
using Amazon.DynamoDBv2.DataModel;
using Amazon.SimpleNotificationService;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using JiejieChenApp.HtmlDocx.Models;

namespace JiejieChenApp.HtmlDocx.Tests;

public class FunctionTest
{
    private readonly Mock<IAmazonS3> _mockAmazonS3 = new();
    private readonly Mock<TimeProvider> _mockTimeProvider = new();
    
    [Fact]
    public async Task TestAPIResponseS3Version()
    {
        var actualS3Requests = new List<GetPreSignedUrlRequest>();
        _mockAmazonS3.Setup(x => x.GetPreSignedURLAsync(Capture.In<GetPreSignedUrlRequest>(actualS3Requests)))
            .ReturnsAsync("https://mock.presigned.url");
        _mockTimeProvider.Setup(x => x.GetUtcNow()).Returns(new DateTimeOffset(2024, 06, 02, 11, 50, 0, TimeSpan.Zero));
        
        
        var functions = new Functions(_mockAmazonS3.Object, _mockTimeProvider.Object,
            Mock.Of<IDynamoDBContext>(), Mock.Of<IAmazonSimpleNotificationService>(),
            new ConfigurationBuilder().Build(), Mock.Of<ILogger<Functions>>());
        var response = await functions.Handler(new TestLambdaContext());
        actualS3Requests.First().BucketName.Should().Be("c2j");
        actualS3Requests.First().Key.Should().Be("resume/JAMES - 0430227759.docx");
        actualS3Requests.First().Expires.Should().Be(new DateTime(2024, 06, 02, 12, 0, 0));
        response.StatusCode.Should().Be(302);
        response.Headers.Should().ContainKey("Location");
        response.Headers["Location"].Should().Be("https://mock.presigned.url");
    }

    [Theory]
    [InlineData(null, "Jane", "A valid email")]
    [InlineData("not-an-email", "Jane", "A valid email")]
    [InlineData("jane@example.com", "", "First name")]
    public void RejectsInvalidLead(string? email, string firstName, string expected)
    {
        LeadInputValidator.Validate(new Lead { Email = email, FirstName = firstName })
            .Should().Contain(expected);
    }

    [Fact]
    public void RejectsOversizedMessageAndInvalidFlag()
    {
        var lead = new Lead { Email = "jane@example.com", FirstName = "Jane", Message = new string('x', 2001) };
        LeadInputValidator.Validate(lead).Should().Contain("maximum length");
        lead.Message = null;
        lead.IsCvDownload = "yes";
        LeadInputValidator.Validate(lead).Should().Contain("Invalid CV download");
        lead.IsCvDownload = "true";
        LeadInputValidator.Validate(lead).Should().BeNull();
    }
}
