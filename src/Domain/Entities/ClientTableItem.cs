namespace ERP.Domain.Entities;

public class ClientTableItem
{
    public ClientTableItem(string name, int id)
    {
        Name = name;
        Id = id;
    }

    public int Id { get; }
    public string Name { get; }    
    
    public decimal OpenInvoicesGrossTotal { get; set; }    
    
    public decimal PaidInvoicesGrossTotal { get; set; }    
}