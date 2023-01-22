using System.Text.Json.Serialization;

namespace ERP.Domain.Entities;

public class CraDay
{
    public int Id { get; set; }
    public int Day { get; set; }
    
    public int Month { get; set; }
    
    public int Year { get; set; }
    
    public bool IsHalfDay { get; set; }
    
    public int CraId { get; set; }
    
    [JsonIgnore]
    public Cra Cra { get; set; }
}