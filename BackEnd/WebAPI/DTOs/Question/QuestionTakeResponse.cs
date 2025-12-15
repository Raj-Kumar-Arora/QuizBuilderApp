namespace WebAPI.DTOs.Question
{
    public class QuestionTakeResponse
    {
        public int QuestionId { get; set; }
        public bool IsCorrect { get; set; }
        public List<int> CorrectAnswerIds { get; set; } = [];
    }
}
