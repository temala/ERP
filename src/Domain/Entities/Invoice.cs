namespace ERP.Domain.Entities;

public class Invoice: BaseAuditableEntity
{
    public Invoice()
    {
        this.InvoiceLines = new List<InvoiceLine>();
        this.Status = InvoiceStatus.Created;
    }
    
    public int ClientId { get; set; }
    public Client Client { get; set; }

    public string Identifier { get; set; }
    
    public int DueDate { get; set; }
    
    public DateTime BillingDate { get; set; }
    
    public string? Message { get; set; }

    public InvoiceStatus Status { get; set; }
    public List<InvoiceLine> InvoiceLines { get; set; }
}

public enum InvoiceStatus
{
    Created,
    Sent,
    Paid,
    Late
}