namespace ERP.Domain.Entities;

public class Mission: BaseAuditableEntity
{
    public string Name { get; set;}
    
    public decimal? Tva { get; set; }
    
    public decimal? PriceHT { get; set; }

    public int ClientId { get; set; }
    public Client Client { get; set; }
}