namespace WebAPI.DTOs.Answer
{
    public class AnswerCreateResponse
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool IsCorrect { get; set; }
    }
}
