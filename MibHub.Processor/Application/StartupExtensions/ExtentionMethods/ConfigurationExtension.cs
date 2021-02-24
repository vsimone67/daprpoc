using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MibHub.Processor.Authentication;
using MibHub.Processor.Application.Models;

namespace MibHub.Processor.Extensions
{
    public static class ConfigurationExtension
    {

        public static IServiceCollection MapConfigToClass(this IServiceCollection services, IConfiguration configuration)
        {

            services.Configure<AuthorizationSettings>(configuration.GetSection("Authorization"));
            services.Configure<PubSubSettings>(configuration.GetSection("PubSub"));
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
                config.AddJsonFile("appsettings.secrets.json", optional: true, reloadOnChange: true);
                config.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true);

                config.AddEnvironmentVariables();
            });

            return builder;
        }

        public static IHostBuilder AddAppConfigurationFromEnvironment(this IHostBuilder builder)
        {
            var basePath = Environment.GetEnvironmentVariable("appdirectory").NullToEmpty();

            return AddConfiguration(builder, basePath);
        }

    }
}