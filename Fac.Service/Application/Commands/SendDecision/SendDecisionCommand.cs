using DaprPoc.Common.Dto;
using MediatR;

namespace Fac.Service.Commands.Application.Commands
{
    public class SendDecisionCommand : IRequest
    {
        public FacCaseDecision CaseDecision { get; set; }
    }
}
