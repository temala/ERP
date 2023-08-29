using Microsoft.EntityFrameworkCore;

namespace ERP.Application.Common.Models;

public class PaginatedList<T>
{
    public IEnumerable<T> Items { get; }
    public int PageNumber { get; }
    public int TotalPages { get; }
    public int TotalCount { get; }

    public PaginatedList(IEnumerable<T> items, int count, int pageNumber, int pageSize)
    {
        PageNumber = pageNumber;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        TotalCount = count;
        Items = items;
    }

    public bool HasPreviousPage => PageNumber > 1;

    public bool HasNextPage => PageNumber < TotalPages;

    public static async Task<PaginatedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
    {
        var list = await source.ToListAsync();
        var count = list.Count;
        var items = list.Skip((pageNumber - 1) * pageSize).Take(pageSize);

        return new PaginatedList<T>(items, count, pageNumber, pageSize);
    }
}