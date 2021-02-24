using DaprPoc.Common.Dto;
using MediatR;

namespace Fac.Service.Commands.Application.Commands
{
    public class ProcessMibCommand : IRequest
    {
        public MibSubmitted MibSubmitted { get; set; }
    }
}
