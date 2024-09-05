using DemoApi.Models;
using DemoApi.Services;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
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

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<TableModel<EnquiryForm>>> Get(int page, int pageSize)
    {
        if (page < 0)
        {
            return BadRequest("Page must be equal or greater than 0");
        }

        if (pageSize <= 0)
        {
            return BadRequest("PageSize must be greater than 0");
        }

        var result = await enquiryService.GetEnquiriesAsync(page, pageSize);
        
        return Ok(result);
    }
}