using AutoMapper;
using DemoApi.Mappings;
using Microsoft.Extensions.Logging.Abstractions;

namespace DemoApi.WebApi.Tests.Mappings;

public class EnquiryFormProfileTests
{
    private readonly MapperConfiguration _config;

    public EnquiryFormProfileTests()
    {
        _config = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<EnquiryFormProfile>();
        }, NullLoggerFactory.Instance);
    } 
    
    [Fact]
    public void ConfigurationTest()
    {
        _config.AssertConfigurationIsValid();
    }
    
}
