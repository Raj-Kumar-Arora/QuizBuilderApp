using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.Data;
using WebAPI.DTOs.Authentication;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly QuizDbContext _context;
        private readonly IAuthService _authService;
        private readonly IConfiguration _configuration;

        public AuthController(QuizDbContext context, IAuthService authService, IConfiguration configuration)
        {
            _context = context;
            _authService = authService;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterRequest request)
        {
            if (_context.Users.Any(u => 
                    (u.Username == request.Username) || (u.Email == request.Email)))
                return BadRequest("Username already exists");

            _authService.CreatePasswordHash(request.Password, out byte[] hash, out byte[] salt);

            var user = new User
            {
                Username = request.Username,
                PasswordHash = hash,
                PasswordSalt = salt,
                Email = request.Email 
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new { message = "User registered" });
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            //string token = _authService.CreateToken(user);
            //return Ok(new { token });

            var user = _context.Users.SingleOrDefault(u => u.Email == request.Email);

            if (user == null || !_authService.VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
                return Unauthorized("Invalid credentials");

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Email)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }
    }
}
