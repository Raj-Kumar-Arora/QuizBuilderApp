using WebAPI.DTOs.Answer;
using WebAPI.Models.Enums;

namespace WebAPI.DTOs.Question
{
    public class QuestionCreateRequest
    {
        public string Text { get; set; }
        public QuestionType QuestionType { get; set; }

        // Allow adding answers
        public List<AnswerCreateRequest> Answers { get; set; }
    }
}
