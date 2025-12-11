using Microsoft.AspNetCore.Mvc;
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

        public AuthController(QuizDbContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterRequest request)
        {
            if (_context.Users.Any(u => u.Username == request.Username))
                return BadRequest("Username already exists");

            _authService.CreatePasswordHash(request.Password, out byte[] hash, out byte[] salt);

            var user = new User
            {
                Username = request.Username,
                PasswordHash = hash,
                PasswordSalt = salt,
                Email = string.Empty 
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("User registered");
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            var user = _context.Users.SingleOrDefault(u => u.Username == request.Username);

            if (user == null)
                return Unauthorized("Invalid username or password");

            if (!_authService.VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
                return Unauthorized("Invalid username or password");

            string token = _authService.CreateToken(user);

            return Ok(new { token });
        }
    }
}
