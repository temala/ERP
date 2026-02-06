using ERP.Domain.Entities;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace ERP.Infrastructure.FileGenerator;

public static class PdfExtensions
{
    private static DateTime ToDateTime(this CraDay day)
    {
        return new DateTime(day.Year, day.Month, day.Day);
    }

    private static void AddOddStyle(this PdfPCell cell, int align)
    {
        cell.BackgroundColor = PdfTheme.MainColor;
        cell.HorizontalAlignment = align;
        cell.PaddingLeft = 10;
        cell.PaddingRight= 10;
        cell.PaddingTop= 5;
        cell.PaddingBottom= 5;
        cell.Border = 0;
    }

    private static void AddEvenStyle(this PdfPCell cell, int align)
    {
        cell.BackgroundColor = PdfTheme.White;
        cell.HorizontalAlignment = align;
        cell.PaddingLeft = 10;
        cell.PaddingRight= 10;
        cell.PaddingTop= 5;
        cell.PaddingBottom= 5;
        cell.Border = 0;
    }
    
    private static void AddWeekEndStyle(this PdfPCell cell, int align)
    {
        cell.BackgroundColor = PdfTheme.MainColorDarker;
        cell.HorizontalAlignment = align;
        cell.PaddingLeft = 10;
        cell.PaddingRight= 10;
        cell.PaddingTop= 5;
        cell.PaddingBottom= 5;
        cell.Border = 0;
    }

    private static void ApplyStyle(DateTime date, PdfPCell cell1, PdfPCell cell2)
    {
        if (date.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday)
        {
            cell1.AddWeekEndStyle(Element.ALIGN_RIGHT);
            cell2.AddWeekEndStyle(Element.ALIGN_LEFT);
        }
        else
        {
            if (date.Day % 2 == 0)
            {
                cell1.AddEvenStyle(Element.ALIGN_RIGHT);
                cell2.AddEvenStyle(Element.ALIGN_LEFT);
            }
            else
            {
                cell1.AddOddStyle(Element.ALIGN_RIGHT);
                cell2.AddOddStyle(Element.ALIGN_LEFT);
            }
        }
    }
    
    public static void AddDayHeader(this PdfPTable table)
    {
        var header1 = new PdfPCell(new Phrase("Jour",PdfTheme.CellHeaderFont));
        var header2 = new PdfPCell(new Phrase("Durée",PdfTheme.CellHeaderFont));

        header1.AddOddStyle(Element.ALIGN_RIGHT);
        header2.AddOddStyle(Element.ALIGN_LEFT);

        table.AddCell(header1);
        table.AddCell(header2);
    }

    public static void AddDay(this PdfPTable table, CraDay day)
    {
        var date = day.ToDateTime();

        var cell1 = new PdfPCell(new Phrase($"{date.ToString("ddd")} {date.Day}",PdfTheme.CellTextFont));
        var cell2 = new PdfPCell(new Phrase(day.IsHalfDay ? "0.5" : "1",PdfTheme.CellTextFont));

        ApplyStyle(date, cell1, cell2);

        table.AddCell(cell1);
        table.AddCell(cell2);
    }
    
    public static void AddEmptyDay(this PdfPTable table, DateTime day)
    {
        var cell1 = new PdfPCell(new Phrase($"{day.ToString("ddd")} {day.Day}",PdfTheme.CellTextFont));
        var cell2 = new PdfPCell(new Phrase("0",PdfTheme.CellTextFont));

        ApplyStyle(day, cell1, cell2);

        table.AddCell(cell1);
        table.AddCell(cell2);
    }
    
    public static void AddCraSummaryCell(this PdfPTable table, Cra craInfo)
    {
        var cell1 = new PdfPCell(new Phrase("Temps du travail",PdfTheme.CellHeaderFont)) {PaddingBottom = 10};
        cell1.AddEvenStyle(Element.ALIGN_LEFT);
        var cell2 = new PdfPCell(new Phrase($"{craInfo.Days.Sum(d=>d.IsHalfDay?0.5:1)} Jours",PdfTheme.CellTextBigFont))
        {
            PaddingBottom = 10
        };
        cell2.AddEvenStyle(Element.ALIGN_LEFT);
        var contentTable = new PdfPTable(2);
        contentTable.AddCell(new PdfPCell(new Phrase($"{craInfo.Days.Sum(d => d.IsHalfDay ? 0 : 1)} Journées",PdfTheme.CellTextFont)){Border = 0});
        contentTable.AddCell(new PdfPCell(new Phrase($"{craInfo.Days.Sum(d => d.IsHalfDay ? 1 : 0)} Demi-Journée",PdfTheme.CellTextFont)){Border = 0});
        var cell3 = new PdfPCell(contentTable)
        {
            PaddingBottom = 10
        };
        cell3.AddEvenStyle(Element.ALIGN_LEFT);

        table.AddCell(cell1);
        table.AddCell(cell2);
        table.AddCell(cell3);
    }
    
    public static void AddCraClientCell(this PdfPTable table, Cra craInfo)
    {
        var cell1 = new PdfPCell(new Phrase("Client", PdfTheme.CellHeaderFont));
        cell1.AddEvenStyle(Element.ALIGN_LEFT);
        var cell2 = new PdfPCell(new Phrase($"{craInfo.Mission.Client.Name}", PdfTheme.CellTextBigFont));
        cell2.AddEvenStyle(Element.ALIGN_LEFT);
        var contentTable = new PdfPTable(2);
        contentTable.AddCell(new PdfPCell(new Phrase($"Date:",PdfTheme.CellTextFont)){Border = 0});
        contentTable.AddCell(new PdfPCell(new Phrase($"Signature:",PdfTheme.CellTextFont)){Border = 0});
        contentTable.AddCell(new PdfPCell(new Phrase($" ",PdfTheme.CellTextFont)){Border = 0,FixedHeight = 100});
        contentTable.AddCell(new PdfPCell(new Phrase($" ",PdfTheme.CellTextFont)){Border = 0,FixedHeight = 100});
        var cell3 = new PdfPCell(contentTable);
        cell3.AddEvenStyle(Element.ALIGN_LEFT);

        table.AddCell(cell1);
        table.AddCell(cell2);
        table.AddCell(cell3);
    }
    
    public static void AddCraEmployeeCell(this PdfPTable table, Cra craInfo)
    {
        var cell1 = new PdfPCell(new Phrase("Prestataire", PdfTheme.CellHeaderFont));
        cell1.AddEvenStyle(Element.ALIGN_LEFT);
        var cell2 = new PdfPCell(new Phrase($"Ridha TEMALA", PdfTheme.CellTextBigFont));
        cell2.AddEvenStyle(Element.ALIGN_LEFT);
        var contentTable = new PdfPTable(2);
        contentTable.AddCell(new PdfPCell(new Phrase($"Date:",PdfTheme.CellTextFont)){Border = 0});
        contentTable.AddCell(new PdfPCell(new Phrase($"Signature:",PdfTheme.CellTextFont)){Border = 0});
        contentTable.AddCell(new PdfPCell(new Phrase($" ",PdfTheme.CellTextFont)){Border = 0,FixedHeight = 100});
        contentTable.AddCell(new PdfPCell(new Phrase($" ",PdfTheme.CellTextFont)){Border = 0,FixedHeight = 100});
        var cell3 = new PdfPCell(contentTable);
        cell3.AddEvenStyle(Element.ALIGN_LEFT);

        table.AddCell(cell1);
        table.AddCell(cell2);
        table.AddCell(cell3);
    }
    
    public static void AddCraNoteCell(this PdfPTable table)
    {
        var cell1 = new PdfPCell(new Phrase("Note", PdfTheme.CellHeaderFont));
        cell1.AddEvenStyle(Element.ALIGN_LEFT);
        
        var contentTable = new PdfPTable(2);
        contentTable.AddCell(new PdfPCell(new Phrase($" ",PdfTheme.CellTextFont)){Border = 0,FixedHeight = 100});
        contentTable.AddCell(new PdfPCell(new Phrase($" ",PdfTheme.CellTextFont)){Border = 0,FixedHeight = 100});
        var cell2 = new PdfPCell(contentTable);
        cell2.AddEvenStyle(Element.ALIGN_LEFT);

        table.AddCell(cell1);
        table.AddCell(cell2);
    }
    
    public static void AddCraSummaryEmptyCell(this PdfPTable table)
    {
        var cell1 = new PdfPCell(new Phrase(" ")) {PaddingBottom = 10};
        cell1.AddOddStyle(Element.ALIGN_LEFT);

        table.AddCell(cell1);
    }
    
    
    public static PdfPTable AddLayoutCraCell(this PdfPTable table, PdfPTable craTable)
    {
        var craCell = new PdfPCell(craTable)
        {
            BackgroundColor = PdfTheme.MainColor,
            Padding = 10,
            Border = 0
        };

        table.AddCell(craCell);

        return table;
    }
    
    public static PdfPTable AddEmptyCell(this PdfPTable table)
    {
        var craCell = new PdfPCell()
        {
            BackgroundColor = PdfTheme.White,
            Padding = 10,
            Border = 0
        };
        table.AddCell(craCell);
        return table;
    }

}