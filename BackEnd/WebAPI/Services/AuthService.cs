using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WebAPI.Models;

namespace WebAPI.Services
{
    public interface IAuthService
    {
        void CreatePasswordHash(string password, out byte[] hash, out byte[] salt);
        bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt);
        string CreateToken(User user);
    }

    public class AuthService : IAuthService
    {
        private readonly IConfiguration _config;

        public AuthService(IConfiguration config)
        {
            _config = config;
        }

        public void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
        {
            using var hmac = new HMACSHA512();
            salt = hmac.Key;
            hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        public bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            using var hmac = new HMACSHA512(storedSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(storedHash);
        }

        public string CreateToken(User user)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(5),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

