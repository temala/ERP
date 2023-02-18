namespace ERP.Domain.Entities;

public class Mission: Product
{
    public int ClientId { get; set; }
    public Client Client { get; set; }
}