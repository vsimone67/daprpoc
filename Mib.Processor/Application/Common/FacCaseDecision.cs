namespace DaprPoc.Common.Dto
{
    public class FacCaseDecision : CaseBase
    {
        public string DecisionType { get; set; }
        public FacCase Case { get; set; }
    }
}
