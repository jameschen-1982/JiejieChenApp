using AutoMapper;
using DemoApi.Data;
using DemoApi.Models;
using Microsoft.EntityFrameworkCore;


namespace DemoApi.Services;

public class EnquiryService(DemoContext demoContext, IMapper mapper): IEnquiryService
{
    public async Task CreateEnquiryAsync(EnquiryForm enquiryForm)
    {
        var entity = mapper.Map<DemoApi.Domain.EnquiryForm>(enquiryForm);
        demoContext.EnquiryForms.Add(entity);
        await demoContext.SaveChangesAsync();
    }

    public async Task<TableModel<EnquiryForm>> GetEnquiriesAsync(int page, int pageSize)
    {
        var totalEnquiries = await demoContext.EnquiryForms.CountAsync();
        var totalPageCount = (int)Math.Ceiling((decimal)totalEnquiries / pageSize);
        
        var enquiries = mapper.Map<IEnumerable<EnquiryForm>>(await demoContext.EnquiryForms
            .OrderBy(x => x.TimeSubmitted)
            .Skip(page * pageSize)
            .Take(pageSize)
            .ToListAsync());
        
        return new TableModel<EnquiryForm>
        {
            PageIndex = page,
            TotalPageCount = totalPageCount,
            Data = enquiries
        };
    }
    
}