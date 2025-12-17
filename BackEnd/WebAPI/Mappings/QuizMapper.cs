using WebAPI.DTOs.Question;
using WebAPI.Models;

namespace WebAPI.Mappings
{
    public static class QuizMapper
    {
        public static Question MapQuestion(QuestionUpdateRequest dto)
        {
            var question = new Question
            {
                Text = dto.Text,
                QuestionType = dto.QuestionType,
                Answers = dto.Answers.Select(a => new Answer
                {
                    Text = a.Text,
                    IsCorrect = a.IsCorrect
                }).ToList()
            };

            // Domain validation
            question.Validate();

            return question;
        }

    }
}
