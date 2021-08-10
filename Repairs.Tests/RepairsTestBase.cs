using Microsoft.EntityFrameworkCore;
using RepairsData.RepairsContext;
using System;

namespace Repairs.Tests
{
    public class RepairsTestBase : IDisposable
    {
        protected readonly RepairsContext _context;

        public RepairsTestBase()
        {
            var options = new DbContextOptionsBuilder<RepairsContext>()
                                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                                .Options;
            _context = new RepairsContext(options);
            _context.Database.EnsureCreated();
            RepairsTestInitializer.Initialize(_context);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}