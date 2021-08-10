using AutoFixture;
using RepairsData.RepairsContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repairs.Tests
{
    public static class RepairsTestInitializer
    {
        public static void Initialize(RepairsContext context)
        {
            var test = new Fixture();
            var list = new List<RepairsData.RepairsContext.Models.Repairs>();
            for (int i = 0; i < 10; i++)
            {
                var t = test.Create<RepairsData.RepairsContext.Models.Repairs>();
                list.Add(t);
            }
            context.AddRange(list);
            context.SaveChanges();
        }
    }
}