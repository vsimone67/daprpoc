using Microsoft.AspNetCore.Http;
using Serilog.Events;
using System.Threading.Tasks;

namespace Fac.Service.Extensions
{
    public class DynamicLoggingMiddleware
    {
        public DynamicLoggingMiddleware(RequestDelegate next) { } // Required

        public async Task InvokeAsync(HttpContext context)
        {
            var level = context.Request.RouteValues["level"];
            Program.LevelSwitch.MinimumLevel = (LogEventLevel)int.Parse(level.ToString());
            await context.Response.WriteAsync($"Level set to {level}");
        }

    }
}