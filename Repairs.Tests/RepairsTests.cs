using System;
using System.Linq;
using Xunit;

namespace Repairs.Tests
{
    public class RepairsTests : RepairsTestBase
    {
        [Fact]
        public void GetRepairs()
        {
            var repairs = _context.Repairs.ToList();

            Assert.Equal(10, repairs.Count);
        }
    }
}