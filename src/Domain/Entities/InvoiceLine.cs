namespace ERP.Domain.Entities;

public class InvoiceLine : BaseAuditableEntity
{
    public Product Product { get; set; }
    
    public int ProductId { get; set; }

    public DateTime Date { get; set; }

    public int Quantity { get; set; }
    
    public List<Invoice> Invoices { get; set; }
}