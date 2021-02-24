using System;
using System.Collections.Generic;
using System.Threading;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;
using QueueTest.Application.Dto;
using QueueTest.Persistence.DbService;

namespace QueueTest.Application.Queries
{
    public class MyQueryHandler : IRequestHandler<MyQuery, List<MyDto>>
    {
        private readonly IDatabaseService _dbService;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public MyQueryHandler(IServiceProvider serviceProvider)
        {
            _dbService = serviceProvider.GetService<IDatabaseService>();
            _logger = serviceProvider.GetService<ILogger<MyQueryHandler>>();
            _mapper = serviceProvider.GetService<IMapper>();
        }

        public async Task<List<MyDto>> Handle(MyQuery request, CancellationToken cancellationToken)
        {
            var companyList = await _dbService.GetData();

            return _mapper.Map<List<MyDto>>(companyList);
        }
    }
}
