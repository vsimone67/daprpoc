using DaprPoc.Common.Dto;
using MediatR;

namespace Fac.Service.Commands.Application.Commands
{
    public class SendMibCommand : IRequest
    {
        public MibSubmitted MibToSubmit { get; set; }
    }
}
