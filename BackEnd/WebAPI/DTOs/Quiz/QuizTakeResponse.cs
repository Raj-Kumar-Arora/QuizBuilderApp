using WebAPI.DTOs.Question;

namespace WebAPI.DTOs.Quiz
{
    public class QuizTakeResponse
    {
        public int TotalQuestions { get; set; }
        public int CorrectAnswers { get; set; }
        public double ScorePercentage { get; set; }
        public List<QuestionTakeResponse> QuestionResults { get; set; } = [];
    }
}
