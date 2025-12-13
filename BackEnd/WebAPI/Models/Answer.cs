namespace WebAPI.Models
{
    public class Answer
    {
        public int Id { get; set; }
        public required string Text { get; set; } = string.Empty;
        public required bool IsCorrect { get; set; }
        public int QuestionId { get; set; }
        public Question Question { get; set; }
    }
}