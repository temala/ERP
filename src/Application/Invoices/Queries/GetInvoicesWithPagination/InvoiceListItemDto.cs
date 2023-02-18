using ERP.Application.Common.Mappings;
using ERP.Domain.Entities;

namespace ERP.Application.Invoices.Queries.GetInvoicesWithPagination;

public class 
    InvoiceListItemDto : IMapFrom<Invoice>
{
    public int Id { get; set; }

    public DateTime BilligDate { get; set; }
    
    public int DueDate { get; set; }
    
    public InvoiceStatus Status { get; set; }
    public string Identifier { get; set; }
    
    public decimal? TotalTTC { get; set; }
    public Client Client { get; set; }
}

public enum InvoiceStatus
{
    Created,
    Sent,
    Paid,
    Late
}