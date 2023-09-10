using ERP.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.Common.Comparer;

public class InvoiceLineComparer : IEqualityComparer<InvoiceLine>
{
    public bool Equals(InvoiceLine x, InvoiceLine y)
    {
        return x.Id == y.Id;
    }

    public int GetHashCode(InvoiceLine obj)
    {
        return obj.Id.GetHashCode();
    }
}
