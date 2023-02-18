namespace ERP.Domain.Entities;

public class Invoice: BaseAuditableEntity
{
    public Invoice()
    {
        this.InvoiceLines = new List<InvoiceLine>();
    }
    
    public int ClientId { get; set; }
    public Client Client { get; set; }

    public string Identifier { get; set; }
    
    public int DueDate { get; set; }
    
    public DateTime BilligDate { get; set; }
    
    public string? Message { get; set; }

    public List<InvoiceLine> InvoiceLines { get; set; }
}