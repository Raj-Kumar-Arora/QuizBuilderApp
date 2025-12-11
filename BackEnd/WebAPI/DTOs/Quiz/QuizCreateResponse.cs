using WebAPI.DTOs.Question;

namespace WebAPI.DTOs.Quiz
{
    public class QuizCreateResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int AuthorId { get; set; }
        public bool IsPublished { get; set; }

        public List<QuestionCreateResponse> Questions { get; set; } = new ();
    }
}
