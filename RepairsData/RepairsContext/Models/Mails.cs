// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace RepairsData.RepairsContext.Models
{
    public partial class Mails
    {
        public int Id { get; set; }
        public int ServiceTypeId { get; set; }
        public string Mail { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }

        public virtual ServiceTypes ServiceType { get; set; }
    }
}