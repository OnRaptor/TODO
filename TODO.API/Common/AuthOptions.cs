using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace TODO.API.Common
{
    public class AuthOptions
    {
        public const string ISSUER = "Lightless"; // издатель токена
        public const string AUDIENCE = "TODO.APP"; // потребитель токена
        const string KEY = "8dfc88a0-7a8e-41a5-8320-60ad8a64280d";  
        public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
    }
}
