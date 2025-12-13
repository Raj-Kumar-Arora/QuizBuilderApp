using WebAPI.DTOs.Question;

namespace WebAPI.DTOs.Quiz
{
    public class QuizUpdateRequest
    {
        public string Title { get; set; } = string.Empty;
        // AuthorId & IsPublished are intentionally not updatable
        // as these will be only set during creation and publishing respectively.
        public List<QuestionUpdateRequest> Questions { get; set; } = [];
    }
}
