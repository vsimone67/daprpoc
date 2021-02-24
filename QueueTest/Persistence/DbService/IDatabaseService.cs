using System.Collections.Generic;
using System.Threading.Tasks;
using QueueTest.Application.Dto;

namespace QueueTest.Persistence.DbService
{
    public interface IDatabaseService
    {
        Task<List<MyDto>> GetData();
    }
}
