namespace ERP.Domain.Entities;

public static class InvoiceHelper
{
    public static decimal? GetTotalTTC(this Product product)
    {
        return product.PriceHT + ((product.Tva * product.PriceHT) / 100);
    }
    
    public static decimal? GetTotalTTC(this Invoice invoice)
    {
        return invoice.InvoiceLines.Sum(l => l.Product!.GetTotalTTC() * l.Quantity);
    }
    
    public static DateTime GetDueDate(this Invoice invoice)
    {
        return invoice.BillingDate.AddDays(invoice.DueDate);
    }
}