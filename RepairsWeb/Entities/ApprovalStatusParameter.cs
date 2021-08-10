using System;

namespace RepairsWeb.Entities
{
    public class ApprovalStatusParameter
    {
        public int Id { get; set; }

        public int ApprovalStatusId { get; set; }

        public decimal Money { get; set; }

        public DateTime? ExecuteDate { get; set; }

        public string Comment { get; set; }
    }
}