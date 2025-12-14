using System.Security.Claims;

namespace WebAPI.Extensions
{
    #region AUTHORIZATION  HARDENING / HELPERS
    // * Users cannot access others’ quizzes
    // * Only owners can edit/delete/publish
    // * Public users cannot access protected APIs
    // * Backend is the single source of truth

    // This class provides extension methods for ClaimsPrincipal
    // Used to extract user-related information from the claims

    public static class ClaimsPrincipalExtensions
    {
        public static int GetUserId(this ClaimsPrincipal user)
        {
            return int.Parse(
                user.FindFirstValue(ClaimTypes.NameIdentifier)!
            );
        }
    }

    #endregion AUTHORIZATION  HARDENING / HELPERS
}
