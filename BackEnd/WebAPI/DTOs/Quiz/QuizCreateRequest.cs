using WebAPI.DTOs.Question;

namespace WebAPI.DTOs.Quiz
{
    public class QuizCreateRequest
    {
        public string Title { get; set; }

        // Allow sending questions from Swagger
        public required List<QuestionCreateRequest> Questions { get; set; }
    }
}
