namespace DemoApi.Models;

public record TableModel<T>
{
    public int PageIndex { get; set; }
    
    public int TotalPageCount { get; set; }
    
    public required IEnumerable<T> Data { get; set; }
}