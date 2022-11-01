using ERP.Application.Common.Mappings;
using ERP.Domain.Entities;

namespace ERP.Application.Clients.Queries.GetClientsWithPagination;

public class ClientListItemDto : IMapFrom<Client>
{
    public int Id { get; set; }

    public string Name { get; set; }
    
    public decimal OpenInvoicesGrossTotal { get; set; }    
    
    public decimal PaidInvoicesGrossTotal { get; set; }    
}
