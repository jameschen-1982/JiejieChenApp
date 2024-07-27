using AutoMapper;
using DemoApi.Data;
using DemoApi.Models;


namespace DemoApi.Services;

public class EnquiryService(DemoContext demoContext, IMapper mapper): IEnquiryService
{
    public async Task CreateEnquiryAsync(EnquiryForm enquiryForm)
    {
        var entity = mapper.Map<DemoApi.Domain.EnquiryForm>(enquiryForm);
        demoContext.EnquiryForms.Add(entity);
        await demoContext.SaveChangesAsync();
    }
}