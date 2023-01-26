using ERP.Domain.Common;

namespace ERP.Application.Common.Interfaces;

public interface IPdfGenerator<in T> where T:BaseEntity
{
    Stream GeneratePdf(T entity);
}