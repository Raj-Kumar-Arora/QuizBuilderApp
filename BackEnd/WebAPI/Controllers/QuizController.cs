using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.DTOs.Quiz;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly QuizDbContext _quizDbContext;
        private readonly IMapper _mapper;

        public QuizController(QuizDbContext quizDbContext, IMapper mapper)
        {
            _quizDbContext = quizDbContext;
            _mapper = mapper;
        }

        // CREETE - POST: api/Quiz
        [HttpPost]
        public IActionResult CreateQuiz([FromBody] QuizCreateRequest quizRequest)
        {
            if (quizRequest == null)
            {
                return BadRequest("Quiz cannot be null.");
            }
            try
            {
                var quiz = new Quiz
                {
                    Title = quizRequest.Title,
                    AuthorId = quizRequest.AuthorId
                };

                // MAP CHILD QUESTIONS
                foreach (var q in quizRequest.Questions)
                {
                    var question = _mapper.Map<Question>(q);
                    quiz.AddQuestion(question);
                }

                quiz.Validate();
                _quizDbContext.Quizzes.Add(quiz);
                _quizDbContext.SaveChanges();

                var response = _mapper.Map<QuizCreateResponse>(quiz);
                //ToDo : CreatedAtAction ??
                return CreatedAtAction(nameof(GetQuizById), new { id = quiz.Id }, response);
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
            var quiz = _quizDbContext.Quizzes
                        .Include(q => q.Questions)
                        .ThenInclude(q => q.Answers)
                        .FirstOrDefault(q => q.Id == id);
            if (quiz == null)
            {
                return NotFound();
            }
            return Ok(quiz);
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
        
        // UPDATE - PUT: api/Quiz/{id}
        [HttpPut]
        [Route("{id}")]
        public IActionResult UpdateQuiz(int id, [FromBody] Quiz updatedQuiz)
        {
            var existingQuiz = _quizDbContext.Quizzes
                                .Include(q => q.Questions)
                                .ThenInclude(q => q.Answers)
                                .FirstOrDefault(q => q.Id == id);
            if (existingQuiz == null)
            {
                return NotFound();
            }
            existingQuiz.Title = updatedQuiz.Title;
            // TODO : Space for Questions update logic for later
            _quizDbContext.SaveChanges();
            return NoContent();
        }

        [HttpPut("{id}/publish")]
        public IActionResult PublishQuiz(int id)
        {
            var quiz = _quizDbContext.Quizzes
                        .Include(q => q.Questions)
                        .ThenInclude(q => q.Answers)
                        .FirstOrDefault(q => q.Id == id);

            if (quiz == null)
                return NotFound();

            try
            {
                quiz.Publish();
                _quizDbContext.SaveChanges();
                return Ok(new QuizPublishResponse
                {
                    QuizId = quiz.Id,
                    Title = quiz.Title,
                    AuthorId = quiz.AuthorId,
                    IsPublished = quiz.IsPublished,
                    Permalink = quiz.Permalink!
                });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("public/{permalink}")]
        [AllowAnonymous]
        public IActionResult GetByPermalink(string permalink)
        {
            var quiz = _quizDbContext.Quizzes
                        .Include(q => q.Questions)
                        .ThenInclude(q => q.Answers)
                        .FirstOrDefault(q => q.Permalink == permalink && q.IsPublished);

            if (quiz == null)
                return NotFound();

            return Ok(quiz);
        }

    }
}
