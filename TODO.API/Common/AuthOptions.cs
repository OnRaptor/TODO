using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace TODO.API.Common
{
    public class AuthOptions
    {
        public const string ISSUER = "Lightless"; // издатель токена
        public const string AUDIENCE = "TODO.APP"; // потребитель токена
        public const string MAGIC = "Komaru"; // соль для пароля
        const string KEY = "Raptor12";   // ключ для шифрации
        public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
    }
}
