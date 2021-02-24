namespace Fac.Service.Application.Models
{
    public class PubSubSettings
    {
        public string PubSubName { get; set; }
        public string FacSendMibTopic { get; set; }
        public string FacCaseDecistionTopic { get; set; }
        public string FacCaseSubmissionTopic { get; set; }

    }
}
