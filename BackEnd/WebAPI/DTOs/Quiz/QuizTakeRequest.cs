using WebAPI.DTOs.Question;

namespace WebAPI.DTOs.Quiz
{
    public class QuizTakeRequest
    {
        public List<QuestionAnswerTakeRequest> Answers { get; set; } = [];
    }
}
