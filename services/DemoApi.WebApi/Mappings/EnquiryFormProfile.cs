using AutoMapper;
using DemoApi.Models;

namespace DemoApi.Mappings;

public class EnquiryFormProfile : Profile
{
    public EnquiryFormProfile()
    {
        CreateMap<EnquiryForm, Domain.EnquiryForm>()
            .ForMember(x => x.Id, options => options.Ignore());
        
        CreateMap<Domain.EnquiryForm, EnquiryForm>();
    }
}