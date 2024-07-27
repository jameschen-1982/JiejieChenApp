using DemoApi.Models;
using DemoApi.Services;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace DemoApi.Controllers;

[Route("api/[controller]")]
[Produces("application/json")]
[ApiController]
public class EnquiryFormController(IEnquiryService enquiryService, IValidator<EnquiryForm> validator): Controller
{
    [HttpPost]
    public async Task<IActionResult> Post(EnquiryForm form)
    {
        var validationResult = await validator.ValidateAsync(form);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }
        
        await enquiryService.CreateEnquiryAsync(form);
        return Created();
    }
}