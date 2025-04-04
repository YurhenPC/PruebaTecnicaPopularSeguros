using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CRUDPopularSeguros.Models;
using Microsoft.EntityFrameworkCore;
using CRUDPopularSeguros.DTO;

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

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> PostLogin([FromBody] LoginRequest data)
        {
            var usuario = await dbContext.Usuarios.FirstOrDefaultAsync(e => e.Username == data.UserName && e.Password == data.Password && e.Activo == 1);

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
