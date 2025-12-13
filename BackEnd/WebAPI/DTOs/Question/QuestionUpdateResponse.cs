using WebAPI.DTOs.Answer;
using WebAPI.Models.Enums;

namespace WebAPI.DTOs.Question
{
    public class QuestionUpdateResponse
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public QuestionType QuestionType { get; set; }

        public List<AnswerUpdateResponse> Answers { get; set; } = new();
    }
}