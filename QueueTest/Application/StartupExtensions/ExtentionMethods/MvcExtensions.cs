﻿using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace QueueTest.Extensions
{
    public static class MvcExtensions
    {
        public static IServiceCollection AddMvcExtensions(this IServiceCollection services, IConfiguration Configuration)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            // HTTPGlobalExcetptionFilter will fire on any internal exception and send back to UI the error
            services.AddMvc(options => options.Filters.Add(typeof(HttpGlobalExceptionFilter)))
                    .AddNewtonsoftJson(opt => opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

            services.AddControllers().AddDapr();

            //TODO: Uncomment line below and add DB Context
            //services.AddHealthChecks().AddDbContextCheck<CrmContext>();
            services.AddHealthChecks();
            return services;
        }

        public static IApplicationBuilder UseMvcExtensions(this IApplicationBuilder builder, IConfiguration Configuration)
        {
            builder.UseCloudEvents();

            builder.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapSubscribeHandler();

                endpoints.MapHealthChecks("/health", new HealthCheckOptions()
                {
                    Predicate = _ => true,
                    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
                });
                endpoints.MapHealthChecks("/liveness", new HealthCheckOptions
                {
                    Predicate = r => r.Name.Contains("self")
                });

                endpoints.MapGet("/config", context =>
                {
                    if (Configuration is IConfigurationRoot root)
                    {
                        return context.Response.WriteAsync(root.GetDebugView());
                    }
                    return Task.CompletedTask;
                });

                endpoints.MapDynamicLogging("/setloglevel/{level:int}");

                endpoints.MapPost("/mibcompleted", async context =>
                {
                    var logger = context.RequestServices.GetRequiredService<ILogger<Startup>>();

                    logger.LogDebug("Queue Test => Mib Has been completed");
                    await Task.FromResult(1);
                    context.Response.StatusCode = 200;
                }).WithTopic("mibprocessor", "mibcompleted");


            });
            return builder;
        }
    }
}