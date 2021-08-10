using Newtonsoft.Json;
using RepairsWeb.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Principal;
using System.Threading.Tasks;

namespace RepairsWeb.Data.Repositories
{
    public class RoleProviderRepository : IRoleProvider
    {
        private HttpClient httpClient;
        private readonly string applicationName = "IES.Repairs";

        public RoleProviderRepository()
        {
            Initialize();
        }

        public void Initialize()
        {
            httpClient = new HttpClient
            {
                BaseAddress = new Uri("http://prm-ad01-app17:300/RoleProvider/"),
            };
            httpClient.DefaultRequestHeaders.Accept.Clear();
            httpClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
        }

        private async Task<T> GetRequestUni<T>(string param, T returnException)
        {
            try
            {
                var response = await httpClient.GetAsync(param);
                string raw = null;
                T res = returnException;
                if (response.IsSuccessStatusCode)
                {
                    raw = await response.Content.ReadAsStringAsync();
                    res = JsonConvert.DeserializeObject<T>(raw);
                }
                return res;
            }
            catch (System.AggregateException)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IEnumerable<string>> GetObjectsForUserRole(string userName, string roleName, int level)
        {
            string metod = "GetObjectsForUserRole";
            var str = $"{metod}?app={applicationName}&user={userName}&role={roleName}&level={level}";
            var rm = await GetRequestUni<string[]>(str, null);
            return rm;
        }

        public async Task<IEnumerable<string>> GetMaisByRole(string roleName)
        {
            string metod = "GetUserMailsForUserRole";
            var str = $"{metod}?app={applicationName}&roleName={roleName}";
            var rm = await GetRequestUni<string[]>(str, null);
            return rm;
        }

        public async Task<IEnumerable<int>> GetIdSourceObjectsForUserSIDRole(SecurityIdentifier userSID, string role, int level)
        {
            string method = "GetIdSourceObjectsForUserSIDRole";
            var str = $"{method}?app={applicationName}&user={userSID}&role={role}&level={level}";
            var rm = await GetRequestUni<int[]>(str, null);
            return rm;
        }

        public async Task<IEnumerable<string>> GetRolesForUserSID(SecurityIdentifier userSID)
        {
            string method = "GetRolesForUserSID";
            var str = $"{method}?app={applicationName}&userSID={userSID}";
            return await GetRequestUni<string[]>(str, null);
        }
    }
}