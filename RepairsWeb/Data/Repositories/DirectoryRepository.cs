using RepairsData.RepairsContext;
using RepairsWeb.Data.Interfaces;
using RepairsWeb.Entities;
using System;
using System.Linq;

namespace RepairsWeb.Data.Repositories
{
    public class DirectoryRepository : IDirectory
    {
        private readonly RepairsContext repairsContext;

        public DirectoryRepository(RepairsContext repairsContext)
        {
            this.repairsContext = repairsContext;
        }

        public int DeleteAddress(int addressId)
        {
            try
            {
                var deletingAddress = repairsContext.Addresses.FirstOrDefault(p => p.Id == addressId);
                if (deletingAddress != null)
                {
                    repairsContext.Addresses.Remove(deletingAddress);
                    repairsContext.SaveChanges();
                }
                return addressId;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Entity SaveAddress(Entity address)
        {
            var adr = repairsContext.Addresses.FirstOrDefault(p => p.Id == address.Id);
            if (adr != null)
                return EditAddress(address);
            else
                return AddNewAddress(address);
        }

        private Entity AddNewAddress(Entity address)
        {
            try
            {
                var newAddress = new RepairsData.RepairsContext.Models.Addresses { Value = address.Value };
                repairsContext.Addresses.Add(newAddress);
                repairsContext.SaveChanges();

                var addedAddress = repairsContext.Addresses.FirstOrDefault(p => p.Id == newAddress.Id);
                if (addedAddress != null) return new Entity { Id = addedAddress.Id, Value = addedAddress.Value };
                throw new Exception("Произошла ошибка при попытке добавить новый адрес");
            }
            catch (Exception)
            {
                throw;
            }
        }

        private Entity EditAddress(Entity address)
        {
            try
            {
                var editingAddress = repairsContext.Addresses.FirstOrDefault(p => p.Id == address.Id);
                if (editingAddress != null)
                {
                    editingAddress.Value = address.Value;
                    repairsContext.SaveChanges();
                }

                return new Entity { Id = editingAddress.Id, Value = editingAddress.Value };
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}