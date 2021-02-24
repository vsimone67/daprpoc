using DaprPoc.Common.Dto;
using MediatR;

namespace MibHub.Processor.Commands.Application.Commands
{
    public class ProcessMibCommand : IRequest
    {
        public MibCompleted MibCompleted { get; set; }
    }
}
