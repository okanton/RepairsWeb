// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace RepairsData.RepairsContext.Models
{
    public partial class Refillings
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? ExecuteDate { get; set; }
        public int AddressId { get; set; }
        public int Count { get; set; }
        public int? LimitId { get; set; }
        public decimal Money { get; set; }
        public int ApprovalStatusId { get; set; }
        public string ItUser { get; set; }
        public string ItUserDepartment { get; set; }
        public string Comment { get; set; }
    }
}