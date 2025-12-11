using WebAPI.DTOs.Answer;
using WebAPI.Models.Enums;

namespace WebAPI.DTOs.Question
{
    public class QuestionCreateResponse
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public QuestionType QuestionType { get; set; }

        public List<AnswerCreateResponse> Answers { get; set; } = new();
    }
}
