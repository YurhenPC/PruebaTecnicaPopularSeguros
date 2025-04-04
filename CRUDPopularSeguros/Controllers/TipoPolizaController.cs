using CRUDPopularSeguros.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUDPopularSeguros.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoPolizaController : ControllerBase
    {
        private readonly PruebaTecnicaPopularSegurosContext dbContext;
        public TipoPolizaController(PruebaTecnicaPopularSegurosContext _dbContext)
        {
            dbContext = _dbContext;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Get()
        {
            var listaTipoPlizas = await dbContext.TipoPolizas.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, listaTipoPlizas);
        }
    }
}
