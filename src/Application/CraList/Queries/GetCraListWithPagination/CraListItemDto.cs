using ERP.Application.Common.Mappings;
using ERP.Domain.Entities;

namespace ERP.Application.CraList.Queries.GetCraListWithPagination;

public class CraListItemDto : IMapFrom<Cra>
{
    public CraListItemDto()
    {
        this.Days = new List<CraDay>();
    }
    public int Id { get; set; }
    public int Month { get; set; }
    public int Year { get; set; }

    public string Period { get { return new DateTime(this.Year, this.Month, 1).ToString("MMMM yyyy"); } }

    public List<CraDay> Days { get; set; }

    public Mission Mission { get; set; }
}
