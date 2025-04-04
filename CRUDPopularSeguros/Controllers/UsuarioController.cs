using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CRUDPopularSeguros.Models;
using Microsoft.EntityFrameworkCore;

namespace CRUDPopularSeguros.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly PruebaTecnicaPopularSegurosContext dbContext;
        public UsuarioController(PruebaTecnicaPopularSegurosContext _dbContext)
        {
            dbContext = _dbContext;
        }

        [HttpGet]
        [Route("Login")]
        public async Task<IActionResult> GetLogin(String username, String password)
        {
            var usuario = await dbContext.Usuarios.FirstOrDefaultAsync(e => e.Username == username && e.Password == password && e.Activo == 1);

            if (usuario != null) {
                return StatusCode(StatusCodes.Status200OK, usuario);
            }
            else
            {
                return StatusCode(StatusCodes.Status404NotFound,"Usuario no encontrado o sin permiso");
            }
        }
    }
}
