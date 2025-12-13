using WebAPI.DTOs.Question;

namespace WebAPI.DTOs.Quiz
{
    public class QuizUpdateResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int AuthorId { get; set; }
        public bool IsPublished { get; set; }

        public List<QuestionUpdateResponse> Questions { get; set; } = new();
    }
}
