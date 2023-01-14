using System.Collections.ObjectModel;

namespace ERP.Domain.Entities;

public class Cra: BaseAuditableEntity
{
    public int Month { get; set; }
    
    public int Year { get; set; }
    
    public List<CraDay> Days { get; set; }
    
    public int MissionId { get; set; }
    
    public Mission Mission { get; set; }
}

public class CraDay
{
    public int Id { get; set; }
    public int Day { get; set; }
    
    public int Month { get; set; }
    
    public int Year { get; set; }
    
    public int CraId { get; set; }
    
    public Cra Cra { get; set; }
}