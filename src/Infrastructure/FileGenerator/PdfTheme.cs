using iTextSharp.text;

namespace Microsoft.Extensions.DependencyInjection.FileGenerator;

public static class PdfTheme
{
    public static readonly BaseColor MainColor = new(239, 230, 250);
    public static readonly BaseColor MainColorDarker = new(235, 222, 250);
    
    public static readonly Font CellTextFont = FontFactory.GetFont(FontFactory.HELVETICA, 9,Font.NORMAL);
    public static readonly Font CellHeaderFont = FontFactory.GetFont(FontFactory.HELVETICA, 9,Font.BOLD);
}