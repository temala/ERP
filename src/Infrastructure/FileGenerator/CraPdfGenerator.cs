using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace Microsoft.Extensions.DependencyInjection.FileGenerator;

public class CraPdfGenerator : IPdfGenerator<Cra>
{
    
    private PdfPTable GenerateDaysTable(Cra entity)
    {
        var table = new PdfPTable(2)
            {
                DefaultCell = {Border = Rectangle.NO_BORDER},
                SpacingBefore = 0,
                SpacingAfter = 0
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

    private PdfPTable GenerateLayoutTable(Document document)
    {
        var table = new PdfPTable(3)
        {
            DefaultCell = {Border = Rectangle.NO_BORDER},
            SpacingBefore = 0,
            SpacingAfter = 0,
        };
        table.TotalWidth = document.PageSize.Width - 70;
        table.LockedWidth = true;
        table.SetWidths(new []{30f,10f,60f});
        
        return table;
    }

    private PdfPTable GenerateInformationTable(Cra entity)
    {
        var table = new PdfPTable(1)
        {
            DefaultCell = {Border = Rectangle.NO_BORDER},
            SpacingBefore = 0,
            SpacingAfter = 0
        };
        table.AddCraSummaryCell(entity);
        table.AddCraSummaryEmptyCell();
        table.AddCraClientCell(entity);
        table.AddCraSummaryEmptyCell();
        table.AddCraEmployeeCell(entity);
        table.AddCraSummaryEmptyCell();
        table.AddCraNoteCell();
        
        return table;
    }
    public Stream GeneratePdf(Cra entity)
    {
        var document = new Document();
        var stream = new MemoryStream();
        var pdfWriter = PdfWriter.GetInstance(document, stream);
        document.Open();
        
        var phrase = new Phrase($"COMPTE RENDU D'ACTIVITÉ MENSUEL {new DateTime(entity.Year, entity.Month, 1):yyyy-MMMM}", PdfTheme.Header);
        var paragraph = new Paragraph(phrase) {Alignment = Element.ALIGN_CENTER};
        
        document.Add(paragraph);
        
        document.Add(Chunk.SPACETABBING);

        var layout = GenerateLayoutTable(document)
            .AddLayoutCraCell(GenerateDaysTable(entity))
            .AddEmptyCell()
            .AddLayoutCraCell(GenerateInformationTable(entity));

        document.Add(layout);
        
        pdfWriter.CloseStream = false;
        
        document.Close();
        
        stream.Position = 0;

        return stream;
    }
}