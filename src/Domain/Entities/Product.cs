namespace ERP.Domain.Entities;

public class Product : BaseAuditableEntity
{
    public string Name { get; set;}
    
    public decimal? Tva { get; set; }
    
    public decimal? PriceHT { get; set; }
}