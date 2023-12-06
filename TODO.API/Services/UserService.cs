using DB.Models;
using Domain.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TODO.API.Common;

namespace TODO.API.Services
{
    public class UserService
    {
        private readonly APIContext _context;
        public UserService(APIContext _context) 
        {
            this._context = _context;
        }

        public async Task<User> CreateUser(UserDTO userData, string password)
        {
            var user = await _context.Users.AddAsync(new() 
            {
                UserName = userData.Name,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(AuthOptions.MAGIC)
            });
            await _context.SaveChangesAsync();
            return user.Entity;
        }

        public async Task<bool> VerifyUser(string username, string password)
        {
            var user = await (
                       from u in _context.Users
                       where u.UserName == username
                       select u
                       ).FirstOrDefaultAsync();

            if (user != null)
                return BCrypt.Net.BCrypt.Verify(AuthOptions.MAGIC, user.PasswordHash);
            else 
                return false;
        }

        public async Task<User?> FindUserByUserName(string username)
        {
            var match = await (
                       from u in _context.Users
                       where u.UserName == username
                       select u
                       ).FirstOrDefaultAsync();

            return match ?? null;
        }

        public async Task<User?> FindUserByUUID(string UUID)
        {
            var uuid = Guid.Parse(UUID);
            var match = await _context.Users.FindAsync(uuid);

            return match ?? null;
        }
    }
}
