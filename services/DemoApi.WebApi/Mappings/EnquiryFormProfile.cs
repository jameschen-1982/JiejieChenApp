using AutoMapper;
using DemoApi.Models;

namespace DemoApi.Mappings;

public class EnquiryFormProfile : Profile
{
    public EnquiryFormProfile()
    {
        CreateMap<EnquiryForm, Domain.EnquiryForm>();
    }
}