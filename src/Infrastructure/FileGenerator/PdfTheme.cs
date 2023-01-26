using iTextSharp.text;

namespace ERP.Infrastructure.FileGenerator;

public static class PdfTheme
{
    public static readonly BaseColor MainColor = new(239, 230, 250);
    public static readonly BaseColor MainColorDarker = new(235, 222, 250);
    public static readonly BaseColor MainColorText = new(113, 77, 255);
    
    public static readonly Font Header = FontFactory.GetFont(FontFactory.HELVETICA, 11,Font.BOLD);
    public static readonly Font CellTextFont = FontFactory.GetFont(FontFactory.HELVETICA, 9,Font.NORMAL);
    public static readonly Font CellTextBigFont = FontFactory.GetFont(FontFactory.HELVETICA, 13,Font.BOLD,MainColorText);
    public static readonly Font CellHeaderFont = FontFactory.GetFont(FontFactory.HELVETICA, 9,Font.BOLD);
    public static readonly BaseColor White = BaseColor.WHITE;
}