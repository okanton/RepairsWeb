using RepairsData.RepairsContext.Models;
using System.Collections.Generic;

namespace RepairsWeb.Entities
{
    public class UserAccessInformation
    {
        public IEnumerable<ApprovalStatuses> ApprovalStatusesByRoles { get; set; }

        public IEnumerable<string> Roles { get; set; }

        public bool IsAuth { get; set; } = false;

        public string UserName { get; set; }

        public string UserFullName { get; set; }
    }
}