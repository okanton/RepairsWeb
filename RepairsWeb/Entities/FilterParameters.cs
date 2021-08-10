using System;

namespace RepairsWeb.Entities
{
    public class FilterParameters
    {
        public DateTime? DateFrom { get; set; }

        public DateTime? DateTo { get; set; }

        public int? ApprovalStatusId { get; set; }

        public int? AddressId { get; set; }

        public int? OrganizationId { get; set; }
    }
}