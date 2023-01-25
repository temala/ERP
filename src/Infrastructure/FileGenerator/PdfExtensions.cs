using ERP.Domain.Entities;
using iTextSharp.text.pdf;

namespace Microsoft.Extensions.DependencyInjection.FileGenerator;

public static class PdfExtensions
{
    public static DateTime ToDateTime(this CraDay day)
    {
        return new DateTime(day.Year, day.Month, day.Day);
    }

    public static void AddDayHeader(this PdfPTable table)
    {
        table.AddCell("Jour");
        table.AddCell("Durée");
    }

    public static void AddDay(this PdfPTable table, CraDay day)
    {
        var date = day.ToDateTime();

        table.AddCell(date.ToString("dddd d"));
        table.AddCell(day.IsHalfDay ? "0.5" : "1");
    }

    public static void AddEmptyDay(this PdfPTable table, DateTime day)
    {
        table.AddCell(day.ToString("dddd d"));
        table.AddCell("0");
    }
}