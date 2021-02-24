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

namespace QueueTest.Application.Commands
{
    public class MyCommandHandler : IRequestHandler<MyCommand, MyDto>
    {
        private readonly IDatabaseService _dbService;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public MyCommandHandler(IServiceProvider serviceProvider)
        {
            _dbService = serviceProvider.GetService<IDatabaseService>();
            _logger = serviceProvider.GetService<ILogger<MyCommandHandler>>();
            _mapper = serviceProvider.GetService<IMapper>();
        }

        public async Task<MyDto> Handle(MyCommand request, CancellationToken cancellationToken)
        {
            var companyList = await _dbService.GetData();

            return _mapper.Map<MyDto>(companyList);
        }
    }
}
