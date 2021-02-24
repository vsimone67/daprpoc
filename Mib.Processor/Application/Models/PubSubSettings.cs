using System;

namespace Mib.Processor.Application.Models
{
    public class PubSubSettings
    {
        public string FacPubSub { get; set; }
        public string MibPubSub { get; set; }
        public string FacSendMibTopic { get; set; }
        public string MibCompletedTopic { get; set; }    
    }
}