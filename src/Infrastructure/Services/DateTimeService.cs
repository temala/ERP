using ERP.Application.Common.Interfaces;

namespace ERP.Infrastructure.Services;

public class DateTimeService : IDateTime
{
    public DateTime Now => DateTime.Now;
}
