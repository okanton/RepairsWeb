using RepairsWeb.Entities;

namespace RepairsWeb.Data.Interfaces
{
    public interface IDirectory
    {
        public Entity SaveAddress(Entity address);

        public int DeleteAddress(int addressId);
    }
}