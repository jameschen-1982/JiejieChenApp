using DemoApi.Models;

namespace DemoApi.Services;

public interface IEnquiryService
{
    public Task CreateEnquiryAsync(EnquiryForm enquiryForm);
}