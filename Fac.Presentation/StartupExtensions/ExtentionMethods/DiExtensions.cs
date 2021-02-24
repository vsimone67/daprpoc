using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Fac.Presentation
{
    public static class DiExtensions
    {
        public static IServiceCollection ConfigureDiEnvironment(this IServiceCollection services, IConfiguration Configuration)
        {
            // ******* Add Database Services here *******

            // ************** Add Contexts here **********          

            // ***** Add remaining services here **************
            //Uncomment below and change class for background processing
            //services.AddHostedService<ServicesStatusMonitor>(); // background process to monitor services

            return services;
        }
    }
}