﻿using System.Reflection;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;

namespace QueueTest.Extensions
{
    public static class AutoMapperExtension
    {
        public static IServiceCollection AddMappingProfiles(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            return services;
        }
    }
}