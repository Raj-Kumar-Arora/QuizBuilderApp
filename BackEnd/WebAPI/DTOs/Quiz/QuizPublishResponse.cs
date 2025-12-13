namespace WebAPI.DTOs.Quiz
{
    public class QuizPublishResponse
    {
        public int QuizId { get; set; }
        public string Title { get; set; } = string.Empty;
        public int AuthorId { get; init; }
        public string Permalink { get; set; }
    }

}
