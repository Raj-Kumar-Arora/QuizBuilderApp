namespace WebAPI.Models
{
    public class Quiz
    {
        public Quiz(int id, string title, int authorId)
        {
            Id = id;
            Title = title;
            AuthorId = authorId;
            IsPublished = false;
        }

        #region Properties Region
        public int Id { get; init; }

        public required string Title { get; set; } = string.Empty;
        public required int AuthorId { get; init; }
        public bool IsPublished { get; set; } = false;
        public IReadOnlyCollection<Question> Questions => _questions.AsReadOnly();

        #endregion Properties Region



        #region Questions Region 
        private const int MinQuestions = 1;
        private const int MaxQuestions = 10;

        private readonly List<Question> _questions = new();

        // IReadOnlyCollection => read-only view of a collection
        //  * Exposes only:  Count / foreach / Index reading
        //  * Does not expose: Add / Remove / Clear / Index writing


        public void AddQuestion(Question question)
        {
            if (_questions.Count >= MaxQuestions)
                throw new InvalidOperationException("A quiz can have a maximum of 10 questions.");

            _questions.Add(question);
        }

        public void RemoveQuestion(Question question)
        {
            ArgumentNullException.ThrowIfNull(question);

            _questions.Remove(question);
        }

        // Validate that the quiz meets all requirements
        // Will be called before saving the quiz to DB
        public void Validate()
        {
            if (_questions.Count < MinQuestions)
                throw new InvalidOperationException("A quiz must have at least 1 question.");
        }

        #endregion Questions Region 


    }
}
