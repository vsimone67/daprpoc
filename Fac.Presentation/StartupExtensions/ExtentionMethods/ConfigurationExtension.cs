using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Fac.Presentation
{
    public static class ConfigurationExtension
    {

        public static IServiceCollection MapConfigToClass(this IServiceCollection services, IConfiguration configuration)
        {

            return services;
        }
        public static IHostBuilder AddConfiguration(this IHostBuilder builder, string basePath = "")
        {
            builder.ConfigureAppConfiguration((builderContext, config) =>
            {
                var env = builderContext.HostingEnvironment;

                if (basePath != string.Empty)
                    config.SetBasePath(basePath);

                config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
                config.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true);
                // we are sharing the appsettings file between angular and .net core so use the one in the angular folder
                // if you want to share appsettings files between spa and .net core uncomment below
                //config.AddJsonFile($"ClientApp/Dist/assets/app-settings/appsettings.{env.EnvironmentName}.json", optional: false, reloadOnChange: true);
                config.AddEnvironmentVariables();
            });

            return builder;
        }

    }
}