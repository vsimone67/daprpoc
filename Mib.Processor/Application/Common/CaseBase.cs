
using System;

namespace DaprPoc.Common.Dto
{
    public class CaseBase
    {
        public string UserConnectionId { get; set; }
        public DateTime SendDate { get; set; }
        public Guid Id => Guid.NewGuid();
    }
}
