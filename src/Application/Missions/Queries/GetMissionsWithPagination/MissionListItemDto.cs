using ERP.Application.Common.Mappings;
using ERP.Domain.Entities;

namespace ERP.Application.Missions.Queries.GetMissionsWithPagination;

public class MissionListItemDto : IMapFrom<Mission>
{
    public int Id { get; set; }

    public string Name { get; set; }
    
    public decimal? Tva { get; set; }
    
    public decimal? PriceHT { get; set; }
    public Client Client { get; set; }
}