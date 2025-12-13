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
            //CreateMap<UserUpdateRequest, User>();
            //CreateMap<User, UserUpdateResponse>();

            // Quiz mappings
            CreateMap<QuizCreateRequest, Quiz>();
            CreateMap<Quiz, QuizCreateResponse>();
            CreateMap<QuizUpdateRequest, Quiz>();
            CreateMap<Quiz, QuizUpdateResponse>();

            // Question mappings
            CreateMap<QuestionCreateRequest, Question>();
            CreateMap<Question, QuestionCreateResponse>();
            CreateMap<QuestionUpdateRequest, Question>();
            CreateMap<Question, QuestionUpdateResponse>();

            // Answer mappings
            CreateMap<AnswerCreateRequest, Answer>();
            CreateMap<Answer, AnswerCreateResponse>();
            CreateMap<AnswerUpdateRequest, Answer>();
            CreateMap<Answer, AnswerUpdateResponse>();
        }
    }

}
