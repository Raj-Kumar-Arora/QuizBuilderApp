namespace WebAPI.Models
{
    public class User
    {
        public required int Id { get; set; }
        public required string Name { get; set; } = string.Empty;
        
        //ToDo: Hash password + Add Salt before storing it to DB
        public required string Password { get; set; } = string.Empty;
        public required string Email { get; set; } = string.Empty;
    }
}
