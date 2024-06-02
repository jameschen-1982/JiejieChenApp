using Xunit;
using Amazon.Lambda.Core;
using Amazon.Lambda.TestUtilities;
using Amazon.S3;
using Amazon.S3.Model;
using FluentAssertions;
using Moq;

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
        
        
        var functions = new Functions(_mockAmazonS3.Object, _mockTimeProvider.Object);
        var response = await functions.Handler(new TestLambdaContext());
        actualS3Requests.First().BucketName.Should().Be("c2j");
        actualS3Requests.First().Key.Should().Be("resume/JCHEN SEEK Resume.docx");
        actualS3Requests.First().Expires.Should().Be(new DateTime(2024, 06, 02, 12, 0, 0));
        response.StatusCode.Should().Be(302);
        response.Headers.Should().ContainKey("Location");
        response.Headers["Location"].Should().Be("https://mock.presigned.url");
    }
}
