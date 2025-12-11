using AutoMapper;
using WebAPI.Models;
using WebAPI.DTOs.User;
using WebAPI.DTOs.Quiz;
using WebAPI.DTOs.Question;
using WebAPI.DTOs.Answer;

namespace WebAPI.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //User mappings
            CreateMap<UserCreateRequest, User>();
            CreateMap<User, UserCreateResponse>();

            // Quiz mappings
            CreateMap<QuizCreateRequest, Quiz>();
            CreateMap<Quiz, QuizCreateResponse>();

            // Question mappings
            CreateMap<QuestionCreateRequest, Question>();
            CreateMap<Question, QuestionCreateResponse>();

            // Answer mappings
            CreateMap<AnswerCreateRequest, Answer>();
            CreateMap<Answer, AnswerCreateResponse>();
        }
    }

}
