using DemoApi.Models;

namespace DemoApi.Services;

public interface IEnquiryService
{
    public Task CreateEnquiryAsync(EnquiryForm enquiryForm);
    
    public Task<TableModel<EnquiryForm>> GetEnquiriesAsync(int page, int pageSize);
}