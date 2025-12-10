using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly QuizDbContext _quizDbContext;

        public QuizController(QuizDbContext quizDbContext)
        {
            _quizDbContext = quizDbContext;
        }

        // CREETE - POST: api/Quiz
        [HttpPost]
        public IActionResult CreateQuiz([FromBody] WebAPI.Models.Quiz quiz)
        {
            if (quiz == null)
            {
                return BadRequest("Quiz cannot be null.");
            }
            try
            {
                quiz.Validate();
                _quizDbContext.Quizzes.Add(quiz);
                _quizDbContext.SaveChanges();
                return CreatedAtAction(nameof(GetAllQuizzes), new { id = quiz.Id }, quiz);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // READ - GET: api/Quiz
        [HttpGet]
        public IActionResult GetAllQuizzes()
        {
            var quizzes = _quizDbContext.Quizzes.ToList();
            return Ok(quizzes);
        }
        // READ - GET: api/Quiz by id
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetQuizById(int id)
        {
            var quiz = _quizDbContext.Quizzes.Find(id);
            if (quiz == null)
            {
                return NotFound();
            }
            return Ok(quiz);
        }

        // UPDATE - PUT: api/Quiz/{id}
        [HttpPut]
        [Route("{id}")]
        public IActionResult UpdateQuiz(int id, [FromBody] WebAPI.Models.Quiz updatedQuiz)
        {
            var existingQuiz = _quizDbContext.Quizzes.Find(id);
            if (existingQuiz == null)
            {
                return NotFound();
            }
            existingQuiz.Title = updatedQuiz.Title;
            // TODO : Space for Questions update logic for later
            _quizDbContext.SaveChanges();
            return NoContent();
        }

        // DELETE - DELETE: api/Quiz/{id}
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteQuiz(int id)
        {
            var quiz = _quizDbContext.Quizzes.Find(id);
            if (quiz == null)
            {
                return NotFound();
            }
            _quizDbContext.Quizzes.Remove(quiz);
            _quizDbContext.SaveChanges();
            return NoContent();
        }
    }
}
