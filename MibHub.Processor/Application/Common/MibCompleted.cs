using System;

namespace DaprPoc.Common.Dto
{
    public class MibCompleted : CaseBase
    {
        public int MibId { get; set; }
        public string Result { get; set; }
        public string User { get; set; }
        public FacCase Case { get; set; }
    }
}
