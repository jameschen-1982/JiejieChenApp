namespace JiejieChenApp.HtmlDocx.Models;

public record Lead
{
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Phone { get; set; }
        public string? Company { get; set; }
        public string? Message { get; set; }
        public DateTime? TimeSubmitted { get; set; }
}