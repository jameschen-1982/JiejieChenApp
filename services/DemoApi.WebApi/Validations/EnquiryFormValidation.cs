using DemoApi.Models;
using FluentValidation;

namespace DemoApi.Validations;

public class EnquiryFormValidator : AbstractValidator<EnquiryForm>
{
    public EnquiryFormValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress().WithMessage("Email is required and must be a valid email address");
    }
}