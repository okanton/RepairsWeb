using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.XSSF.UserModel;
using RepairsWeb.Data.Interfaces;
using RepairsWeb.Entities;
using RepairsWeb.Extentions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace RepairsWeb.Data.Repositories
{
    public class Reports : IReports
    {
        private readonly IRepairs repairs;

        public Reports(IRepairs repairs)
        {
            this.repairs = repairs;
        }

        private static ISheet CreateRepairsSheet(XSSFWorkbook workbook, string sheetName, IEnumerable<Repair> repairs)
        {
            var sheet = workbook.CreateSheet(sheetName);

            var font = workbook.CreateFont();
            font.Boldweight = (short)FontBoldWeight.Bold;

            var fontBold = workbook.CreateCellStyle();
            fontBold.SetFont(font);

            var cellStyleBorderThin = workbook.CreateCellStyle();
            cellStyleBorderThin.BorderBottom = BorderStyle.Thin;
            cellStyleBorderThin.BorderLeft = BorderStyle.Thin;
            cellStyleBorderThin.BorderRight = BorderStyle.Thin;
            cellStyleBorderThin.BorderTop = BorderStyle.Thin;
            cellStyleBorderThin.VerticalAlignment = VerticalAlignment.Center;

            IDataFormat dataFormat = workbook.CreateDataFormat();

            var cellStyleBorderThinDateCell = workbook.CreateCellStyle();
            cellStyleBorderThinDateCell.BorderBottom = BorderStyle.Thin;
            cellStyleBorderThinDateCell.BorderLeft = BorderStyle.Thin;
            cellStyleBorderThinDateCell.BorderRight = BorderStyle.Thin;
            cellStyleBorderThinDateCell.BorderTop = BorderStyle.Thin;
            cellStyleBorderThinDateCell.VerticalAlignment = VerticalAlignment.Center;
            cellStyleBorderThinDateCell.DataFormat = dataFormat.GetFormat("dd.mm.yyyy");

            var cellHorizontalAlignment = workbook.CreateCellStyle();
            cellHorizontalAlignment.Alignment = HorizontalAlignment.Center;

            //Шапка таблицы
            var header = sheet.CreateRow(0);
            header.CreateCell(0).SetCellValue("№");
            header.CreateCell(1).SetCellValue("Дата создания");
            header.CreateCell(2).SetCellValue("Дата выполнения");
            header.CreateCell(3).SetCellValue("Номер заявки");
            header.CreateCell(4).SetCellValue("Неисправность");
            header.CreateCell(5).SetCellValue("Тип оборудования");
            header.CreateCell(6).SetCellValue("Модель");
            header.CreateCell(7).SetCellValue("КЕ");
            header.CreateCell(8).SetCellValue("Серийный номер");
            header.CreateCell(9).SetCellValue("ФИО клиента");
            header.CreateCell(10).SetCellValue("Организация");
            header.CreateCell(11).SetCellValue("Отдел пользователя");
            header.CreateCell(12).SetCellValue("Адрес");
            header.CreateCell(13).SetCellValue("Расположение оборудования");
            header.CreateCell(14).SetCellValue("Телефон пользователя");
            header.CreateCell(15).SetCellValue("Стоимость ремонта");
            header.CreateCell(16).SetCellValue("Статус согласования");
            header.CreateCell(17).SetCellValue("ИТ пользователь");
            header.CreateCell(18).SetCellValue("Отдел ИТ пользователя");
            header.CreateCell(19).SetCellValue("Дополнительная информация");
            header.CreateCell(20).SetCellValue("Примечание");

            ExcelStyles.SetCellStyle(header, header.Cells.Count, cellStyleBorderThin, cellHorizontalAlignment, fontBold);

            var lastColumNum = sheet.GetRow(0).LastCellNum;

            sheet.SetAutoFilter(new CellRangeAddress(0, 0, 0, 20));

            int j = 1;
            foreach (var item in repairs)
            {
                var row = sheet.CreateRow(j);
                row.CreateCell(0).SetCellValue(item.Id);
                row.CreateCell(1).SetCellValue(item.CreateDate.ToShortDateString());
                row.Cells[1].CellStyle = cellStyleBorderThinDateCell;
                row.CreateCell(2).SetCellValue(item.ExecuteDate != null ? item.ExecuteDate.Value.ToShortDateString() : "");
                row.Cells[2].CellStyle = cellStyleBorderThinDateCell;
                row.CreateCell(3).SetCellValue(item.RequestNumber);
                row.CreateCell(4).SetCellValue(item.Trouble);
                row.CreateCell(5).SetCellValue(item.DeviceType.Value);
                row.CreateCell(6).SetCellValue(item.Model);
                row.CreateCell(7).SetCellValue(item.ConfigurationUnitId);
                row.CreateCell(8).SetCellValue(item.SerialNumber);
                row.CreateCell(9).SetCellValue(item.Client.FullUserName);
                row.CreateCell(10).SetCellValue(item.Organization.Value);
                row.CreateCell(11).SetCellValue(item.Client.UserDepartment);
                row.CreateCell(12).SetCellValue(item.Address.Value);
                row.CreateCell(13).SetCellValue(item.Room);
                row.CreateCell(14).SetCellValue(item.Phone);
                row.CreateCell(15).SetCellValue((double)item.Money);
                row.CreateCell(16).SetCellValue(item.ApprovalStatus.Value);
                row.CreateCell(17).SetCellValue(item.ItUser.FullUserName);
                row.CreateCell(18).SetCellValue(item.ItUser.UserDepartment);
                row.CreateCell(19).SetCellValue(item.Information);
                row.CreateCell(20).SetCellValue(item.Comment);

                ExcelStyles.SetCellStyle(row, row.Cells.Count, cellStyleBorderThin);

                j++;
            }

            for (int i = 0; i < lastColumNum; i++)
            {
                sheet.AutoSizeColumn(i);
            }

            sheet.CreateFreezePane(0, 1);

            return sheet;
        }

        private static byte[] GetExcelRepairsReport(IEnumerable<Repair> repairs)
        {
            try
            {
                using var ms = new MemoryStream();
                var workbook = new XSSFWorkbook();
                CreateRepairsSheet(workbook, "Отчет по ремонтам", repairs);
                workbook.Write(ms);

                return ms.ToArray();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public byte[] GetCommonRepairsExcelReport(FilterParameters filterParameters)
        {
            try
            {
                var list = repairs.GetRepairsByFilterParameters(filterParameters).Result;
                return GetExcelRepairsReport(list);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public byte[] GetRepairsByCompanyExcelReport(FilterParameters filterParameters)
        {
            try
            {
                var repairsList = repairs.GetRepairsByFilterParameters(filterParameters).Result.GroupBy(p => p.Organization.Value).ToList();

                using var ms = new MemoryStream();
                var workbook = new XSSFWorkbook();
                foreach (var item in repairsList)
                {
                    var repairs = item.Select(p => p).ToList();
                    CreateRepairsSheet(workbook, item.Key, repairs);
                }
                workbook.Write(ms);
                return ms.ToArray();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}