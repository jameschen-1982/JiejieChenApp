using AutoMapper;
using DemoApi.Mappings;

namespace DemoApi.WebApi.Tests.Mappings;

public class EnquiryFormProfileTests
{
    private readonly MapperConfiguration _config;

    public EnquiryFormProfileTests()
    {
        _config = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<EnquiryFormProfile>();
        });
    } 
    
    [Fact]
    public void ConfigurationTest()
    {
        _config.AssertConfigurationIsValid();
    }
    
}