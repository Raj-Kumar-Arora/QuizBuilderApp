using WebAPI.Models.Enums;

namespace WebAPI.Models
{
    public class Question
    {
        public int Id { get; set; }
        public required string Text { get; set; } = string.Empty;
        public required QuestionType Type { get; set; }
        public int QuizId { get; set; }
        public string QuizName { get; set; } = string.Empty;

        public required List<Answer> Answers { get; set; } = new();

        public void Validate()
        {
            if (Type == QuestionType.MultipleChoice || Type == QuestionType.TrueFalse)
            {
                int correctAnswersCount = Answers.Count(a => a.IsCorrect);
                if (Type == QuestionType.TrueFalse && correctAnswersCount != 1)
                {
                    throw new InvalidOperationException("Single choice questions must have exactly one correct answer.");
                }
                if (Type == QuestionType.MultipleChoice && correctAnswersCount < 1)
                {
                    throw new InvalidOperationException("Multiple choice questions must have at least one correct answer.");
                }
            }
        }
    }
}