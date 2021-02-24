using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace QueueTest.Extensions
{
    public static class MediatorExtention
    {
        public static IServiceCollection AddCommandQueryHandlers(this IServiceCollection services)
        {
            services.AddMediatR(Assembly.GetExecutingAssembly());
            return services;
        }
    }


}