namespace DaprPoc.Common.Dto
{
    public class FacCaseSubmitted : CaseBase
    {
        public string Action { get; set; }
        public FacCase Case { get; set; }
    }
}
