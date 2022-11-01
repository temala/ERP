namespace ERP.Domain.Entities;

public class Client : BaseAuditableEntity
{
    public string Name { get; set;}
    
    public string? ContactName { get; set; }
    
    public string? Email { get; set; }
    
    public string? Telephone { get; set; }
    
    public string? CompanyName { get; set; }
    
    public string? Siret { get; set; }
    
    public string? Tva { get; set; }
    
    public string? Title { get; set; }
    
    public string? Address { get; set; }
    
    public string? PostalCode { get; set; }
    
    public string? Town { get; set; }
    
    public string? Country { get; set; }
}