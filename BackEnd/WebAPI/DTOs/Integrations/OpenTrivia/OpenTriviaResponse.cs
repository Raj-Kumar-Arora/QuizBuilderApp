namespace WebAPI.DTOs.Integrations.OpenTrivia
{
    public class OpenTriviaResponse
    {
        public int Response_Code { get; set; }
        public List<OpenTriviaQuestion> Results { get; set; } = [];
    }
}
