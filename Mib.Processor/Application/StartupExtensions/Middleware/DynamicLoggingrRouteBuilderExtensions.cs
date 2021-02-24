using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace Mib.Processor.Extensions
{
    public static class DynamicLoggingrRouteBuilderExtensions
    {
        public static IEndpointConventionBuilder MapDynamicLogging(
            this IEndpointRouteBuilder endpoints, string pattern)
        {
            var pipeline = endpoints.CreateApplicationBuilder()
                .UseMiddleware<DynamicLoggingMiddleware>()
                .Build();

            return endpoints.Map(pattern, pipeline).WithDisplayName("Dynamic Logging");
        }
    }
}