namespace DemoApi.Domain;

public record EnquiryForm
{
    public Int64 Id { get; set; }
    public string? Email { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Phone { get; set; }
    public string? Company { get; set; }
    public DateTime TimeSubmitted { get; set; }
}