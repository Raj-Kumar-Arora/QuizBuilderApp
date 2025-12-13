namespace WebAPI.DTOs.Answer
{
    public class AnswerUpdateResponse
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool IsCorrect { get; set; }
    }
}
