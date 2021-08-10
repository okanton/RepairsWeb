using NPOI.SS.UserModel;

namespace RepairsWeb.Extentions
{
    public static class ExcelStyles
    {
        public static void SetCellStyle(IRow row, int columnCount, params ICellStyle[] styles)
        {
            for (var i = 0; i < columnCount; i++)
            {
                foreach (var style in styles)
                {
                    row.Cells[i].CellStyle = style;
                }
            }
        }
    }
}