﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace RepairsData.RepairsContext.Models
{
    public partial class ServiceTypes
    {
        public ServiceTypes()
        {
            Mails = new HashSet<Mails>();
        }

        public int Id { get; set; }
        public string Value { get; set; }

        public virtual ICollection<Mails> Mails { get; set; }
    }
}