using System.Collections.Generic;
using System.Security.Principal;
using System.Threading.Tasks;

namespace RepairsWeb.Data.Interfaces
{
    public interface IRoleProvider
    {
        public Task<IEnumerable<string>> GetRolesForUserSID(SecurityIdentifier userSID);

        public Task<IEnumerable<string>> GetMaisByRole(string roleName);

        public Task<IEnumerable<int>> GetIdSourceObjectsForUserSIDRole(SecurityIdentifier userSID, string role, int level);
    }
}