using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace ERP.Infrastructure.FileGenerator;

public class CraPdfGenerator : IPdfGenerator<Cra>
{
    private PdfPTable GenerateLayoutTable(Document document)
    {
        var table = new PdfPTable(3)
        {
            DefaultCell = {Border = Rectangle.NO_BORDER}, SpacingBefore = 0, SpacingAfter = 0,
        };
        table.TotalWidth = document.PageSize.Width - 70;
        table.LockedWidth = true;
        table.SetWidths(new[] {35f, 5f, 60f});

        return table;
    }
    
    private PdfPTable GenerateDaysTable(Cra entity)
    {
        var table = new PdfPTable(2)
        {
            DefaultCell = {Border = Rectangle.NO_BORDER}, SpacingBefore = 0, SpacingAfter = 0
        };

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

    private PdfPTable GenerateInformationTable(Cra entity)
    {
        var table = new PdfPTable(1)
        {
            DefaultCell = {Border = Rectangle.NO_BORDER}, SpacingBefore = 0, SpacingAfter = 0
        };

        return table.AddCraSummaryCell(entity)
            .AddCraSummaryEmptyCell()
            .AddCraClientCell(entity)
            .AddCraSummaryEmptyCell()
            .AddCraEmployeeCell(entity)
            .AddCraSummaryEmptyCell()
            .AddCraNoteCell();
    }

    public Stream GeneratePdf(Cra entity)
    {
        var document = new Document();
        var stream = new MemoryStream();
        var pdfWriter = PdfWriter.GetInstance(document, stream);
        document.Open();
        
        document.AddPdfFileHeader(entity);
        document.AddPdfMissionHeader(entity);

        document.Add(Chunk.SPACETABBING);

        var layout = GenerateLayoutTable(document)
            .AddLayoutCraCell(GenerateDaysTable(entity))
            .AddLayoutEmptyCell()
            .AddLayoutCraCell(GenerateInformationTable(entity));

        document.Add(layout);

        pdfWriter.CloseStream = false;

        document.Close();

        stream.Position = 0;

        return stream;
    }
}