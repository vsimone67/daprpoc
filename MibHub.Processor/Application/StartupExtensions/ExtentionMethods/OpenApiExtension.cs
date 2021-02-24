using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace MibHub.Processor.Extensions
{
    public static class SwaggerExtension
    {
        public static IServiceCollection AddOpenApi(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MibHubProcessor", Version = "v1" });
            });

            return services;
        }

        public static IApplicationBuilder UseOpenApi(this IApplicationBuilder builder)
        {
            builder.UseSwagger();
            builder.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MibHubProcessor v1"));
            return builder;
        }
    }
}
