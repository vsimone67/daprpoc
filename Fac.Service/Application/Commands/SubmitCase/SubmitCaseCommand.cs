using DaprPoc.Common.Dto;
using MediatR;

namespace Fac.Service.Commands.Application.Commands
{
    public class SubmitCaseCommand : IRequest
    {
        public FacCaseSubmitted CaseToSubmit { get; set; }
    }
}
