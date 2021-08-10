namespace RepairsWeb.Entities
{
    public class Repair : CommonInformation
    {
        public string RequestNumber { get; set; }

        public string Trouble { get; set; }

        public Entity DeviceType { get; set; }

        public string Model { get; set; }

        public int ConfigurationUnitId { get; set; }

        public string SerialNumber { get; set; }

        public Entity Organization { get; set; }

        public string Room { get; set; }

        public string Phone { get; set; }

        public string Information { get; set; }

        public User Client { get; set; }

        public string Attachment { get; set; }
    }
}