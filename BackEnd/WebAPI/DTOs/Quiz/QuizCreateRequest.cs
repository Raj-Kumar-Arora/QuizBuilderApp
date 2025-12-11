using WebAPI.DTOs.Question;

namespace WebAPI.DTOs.Quiz
{
    public class QuizCreateRequest
    {
        public string Title { get; set; }
        public int AuthorId { get; set; }

        // Allow sending questions from Swagger
        public List<QuestionCreateRequest> Questions { get; set; }
    }
}
