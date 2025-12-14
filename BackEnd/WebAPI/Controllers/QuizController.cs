using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebAPI.Data;
using WebAPI.DTOs.Integrations.OpenTrivia;
using WebAPI.DTOs.Quiz;
using WebAPI.Mappings;
using WebAPI.Models;
using WebAPI.Models.Enums;

namespace WebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly QuizDbContext _quizDbContext;
        private readonly IMapper _mapper;
        private readonly IHttpClientFactory _httpClientFactory;

        public QuizController(QuizDbContext quizDbContext, IMapper mapper, IHttpClientFactory httpClientFactory)
        {
            _quizDbContext = quizDbContext;
            _mapper = mapper;
            _httpClientFactory = httpClientFactory;
        }

        #region QUIZ - CRUD Operations

        // CREATE - POST: api/Quiz
        [HttpPost]
        public async Task<IActionResult> CreateQuiz([FromBody] QuizCreateRequest quizRequest)
        {
            if (quizRequest == null)
                return BadRequest("Quiz cannot be null.");

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
                await _quizDbContext.SaveChangesAsync();

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
        public async Task<IActionResult> GetQuizById(int id)
        {
            var userId = GetUserId();
            var quiz = await _quizDbContext.Quizzes
                        .Include(q => q.Questions)
                        .ThenInclude(q => q.Answers)
                        .FirstOrDefaultAsync(q => q.Id == id && q.AuthorId == userId);
            
            if (quiz == null)
                return Forbid(); 

            return Ok(quiz);
        }

        // DELETE - DELETE: api/Quiz/{id}
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteQuiz(int id)
        {
            var userId = GetUserId();
            var quiz = await _quizDbContext.Quizzes
                        .FirstOrDefaultAsync(q => q.Id == id && q.AuthorId == userId);

            if (quiz == null)
                return Forbid();

            _quizDbContext.Quizzes.Remove(quiz);
            await _quizDbContext.SaveChangesAsync();
            
            return NoContent();
        }
        
        // UPDATE - PUT: api/Quiz/{id}
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateQuiz(int id, [FromBody] QuizUpdateRequest updatedQuiz)
        {
            var userId = GetUserId();
            var existingQuiz = await _quizDbContext.Quizzes
                                .Include(q => q.Questions)
                                .ThenInclude(q => q.Answers)
                                .FirstOrDefaultAsync(q => q.Id == id && q.AuthorId == userId);
            if (existingQuiz == null)
                return Forbid();

            existingQuiz.Title = updatedQuiz.Title;
            existingQuiz.ClearQuestions();
            foreach (var q in updatedQuiz.Questions)
            {
                existingQuiz.AddQuestion(QuizMapper.MapQuestion(q));
            }

            existingQuiz.Validate();
            await _quizDbContext.SaveChangesAsync();

            return Ok(_mapper.Map<QuizUpdateResponse>(existingQuiz));
        }

        #endregion QUIZ - CRUD Operations

        #region QUIZ - PUBLISH

        [HttpPut("{id}/publish")]
        public async Task<IActionResult> PublishQuiz(int id)
        {
            var userId = GetUserId();

            var quiz = await _quizDbContext.Quizzes
                        .Include(q => q.Questions)
                        .ThenInclude(q => q.Answers)
                        .FirstOrDefaultAsync(q => q.Id == id && q.AuthorId == userId);

            if (quiz == null)
                return Forbid();

            try
            {
                quiz.Publish();
                await _quizDbContext.SaveChangesAsync();
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
        public async Task<IActionResult> GetByPermalink(string permalink)
        {
            var quiz = await _quizDbContext.Quizzes
                        .Include(q => q.Questions)
                        .ThenInclude(q => q.Answers)
                        .FirstOrDefaultAsync(q => q.Permalink == permalink && q.IsPublished);

            if (quiz == null)
                return NotFound();

            return Ok(quiz);
        }

        #endregion QUIZ - PUBLISH

        #region OpenTrivia Integration / IMPORT QUESTIONS
        [HttpPost("{id}/import")]
        public async Task<IActionResult> ImportQuestions (int id, [FromQuery] OpenTriviaImportRequest importRequest)
        {
            var quiz = await _quizDbContext.Quizzes
                .Include(q => q.Questions)
                .ThenInclude(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (quiz == null)
                return NotFound("Quiz not found");

            if (quiz.IsPublished)
                return BadRequest("Cannot modify a published quiz");

            var url = BuildTriviaApiUrl(importRequest.NoOfQuestions, importRequest.QuestionType);

            var client = _httpClientFactory.CreateClient();
            var response = await client.GetFromJsonAsync<OpenTriviaResponse>(url);

            if (response == null || response.Response_Code != 0)
                return BadRequest("Trivia API failed");

            foreach (var t in response.Results)
            {
                var question = MapTriviaQuestion(t, quiz.Id);
                quiz.AddQuestion(question);
            }

            quiz.Validate();
            await _quizDbContext.SaveChangesAsync();

            return Ok(new { Imported = response.Results.Count });
        }

        private static string BuildTriviaApiUrl(int noOfQuestions, QuestionType questionType)
        {
            var query = new List<string> { $"amount={noOfQuestions}" };

            if (questionType == QuestionType.MultipleChoice)
                query.Add($"type=multiple");
            else if (questionType == QuestionType.TrueFalse)
                query.Add($"type=boolean");

            return $"https://opentdb.com/api.php?{string.Join("&", query)}";
        }
        private static Question MapTriviaQuestion(OpenTriviaQuestion t, int quizId)
        {
            var question = new Question
            {
                QuizId = quizId,
                Text = t.Question,
                Type = t.Type == "multiple"
                    ? QuestionType.MultipleChoice
                    : QuestionType.TrueFalse,
                Answers = []
            };

            question.Answers.Add(new Answer
            {
                Text = t.Correct_Answer,
                IsCorrect = true
            });

            foreach (var a in t.Incorrect_Answers)
            {
                question.Answers.Add(new Answer
                {
                    Text = a,
                    IsCorrect = false
                });
            }

            return question;
        }

        #endregion OpenTrivia Integration  / IMPORT QUESTIONS

        #region AUTHORIZATION  HARDENING / HELPERS
        // * Users cannot access others’ quizzes
        // * Only owners can edit/delete/publish
        // * Public users cannot access protected APIs
        // * Backend is the single source of truth

        private int GetUserId()
        {
            return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        }

        #endregion AUTHORIZATION  HARDENING / HELPERS

    }
}
