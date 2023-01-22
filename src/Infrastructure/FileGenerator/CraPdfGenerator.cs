using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace Microsoft.Extensions.DependencyInjection.FileGenerator;

public class CraPdfGenerator : IPdfGenerator<Cra>
{
    private PdfPTable GenerateDaysTable(Cra entity)
    {
        var table = new PdfPTable(2);

        table.AddDayHeader();

        for (int i = 1; i <= DateTime.DaysInMonth(entity.Year, entity.Month); i++)
        {
            var day = entity.Days.FirstOrDefault(d => d.Day == i);
            
            if (day == null)
            {
                table.AddEmptyDay(new DateTime(entity.Year, entity.Month, i));
            }
            else
            {
                table.AddDay(day);
            }
        }

        return table;
    }

    public Stream GeneratePdf(Cra entity)
    {
        var document = new Document();
        var stream = new MemoryStream();
        var pdfWriter = PdfWriter.GetInstance(document, stream);
        document.Open();

        // Add invoice information to the document
        var font = FontFactory.GetFont(FontFactory.HELVETICA, 14);
        var phrase = new Phrase("CRA", font);
        document.Add(phrase);
        document.Add(new Paragraph($"Number: {new DateTime(entity.Year, entity.Month, 1):yyyy-MMMM}"));
        document.Add(new Paragraph("Date: " + DateTime.Now));
        document.Add(new Paragraph($"Mission: {entity.Mission.Name}"));
        document.Add(new Paragraph($"Client: {entity.Mission!.Client!.Name}"));


        document.Add(GenerateDaysTable(entity));
        
        pdfWriter.CloseStream = false;
        
        document.Close();
        
        stream.Position = 0;

        return stream;
    }
}

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