using WebAPI.Models.Enums;

namespace WebAPI.DTOs.Integrations.OpenTrivia
{
    public class OpenTriviaImportRequest
    {
        /*************************************************************************/
        /* NOT MATCHING TO FULL SCHEMA OF OpenTrivia - TO AVOID OVER-ENGINEERING */
        /* REFERENCE ->  OpenTriva schema : https://opentdb.com/api_config.php   */
        /*               NoOfQuestions, Category, Difficulty, Type, Encoding     */
        /*************************************************************************/
        public int NoOfQuestions { get; set; }
        public QuestionType QuestionType { get; set; }
    }
}
