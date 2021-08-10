using System;

namespace RepairsWeb.Entities
{
    public class CommonInformation
    {
        public int Id { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime? ExecuteDate { get; set; }

        public Entity Address { get; set; }

        public decimal Money { get; set; }

        public Entity ApprovalStatus { get; set; }

        public User ItUser { get; set; }

        public string Comment { get; set; }
    }
}