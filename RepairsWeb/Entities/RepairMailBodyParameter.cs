namespace RepairsWeb.Entities
{
    public class RepairMailBodyParameter : MailBodyParameter
    {
        public string RequestNumber { get; set; }

        public string Trouble { get; set; }

        public string ModelType { get; set; }

        public string Model { get; set; }

        public string SerialNumber { get; set; }

        public string ClientFullName { get; set; }

        public string ClientOrganization { get; set; }

        public string ClientDepartment { get; set; }

        public string Room { get; set; }

        public string ClientPhone { get; set; }

        public string ItCreatorFullName { get; set; }

        public string ItCreatorPhone { get; set; }

        public string ItCreatorMobilePhone { get; set; }

        public string Information { get; set; }

        public string ConfigurationUnitId { get; set; }
    }
}