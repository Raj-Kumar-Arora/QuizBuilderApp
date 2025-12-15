namespace WebAPI.DTOs.Question
{
    public class QuestionAnswerTakeRequest
    {
        public int QuestionId { get; set; }
        public List<int> SelectedAnswerIds { get; set; } = [];
    }
}
