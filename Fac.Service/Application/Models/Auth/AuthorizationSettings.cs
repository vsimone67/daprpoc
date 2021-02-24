namespace Fac.Service.Authentication
{
    public class AuthorizationSettings
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string SecretKey { get; set; }
        public int TokenExpires { get; set; }
    }
}