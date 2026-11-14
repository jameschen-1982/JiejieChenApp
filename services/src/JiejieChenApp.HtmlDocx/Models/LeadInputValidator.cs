using System.Net.Mail;

namespace JiejieChenApp.HtmlDocx.Models;

public static class LeadInputValidator
{
    public static string? Validate(Lead? lead)
    {
        if (lead is null) return "Lead is required.";
        if (string.IsNullOrWhiteSpace(lead.FirstName) || lead.FirstName.Length > 100)
            return "First name is required and must be at most 100 characters.";
        if (string.IsNullOrWhiteSpace(lead.Email) || lead.Email.Length > 254 ||
            !MailAddress.TryCreate(lead.Email, out var address) || address.Address != lead.Email)
            return "A valid email address is required (at most 254 characters).";
        if (lead.LastName?.Length > 100 || lead.Company?.Length > 200 ||
            lead.Phone?.Length > 50 || lead.Message?.Length > 2000)
            return "A lead field exceeds its maximum length.";
        if (lead.IsCvDownload is not null && !bool.TryParse(lead.IsCvDownload, out _))
            return "Invalid CV download flag.";
        return null;
    }
}
