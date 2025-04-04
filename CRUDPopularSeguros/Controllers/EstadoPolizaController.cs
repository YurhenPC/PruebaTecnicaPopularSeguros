using CRUDPopularSeguros.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUDPopularSeguros.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoPolizaController : ControllerBase
    {
        private readonly PruebaTecnicaPopularSegurosContext dbContext;
        public EstadoPolizaController(PruebaTecnicaPopularSegurosContext _dbContext)
        {
            dbContext = _dbContext;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Get()
        {
            var listaEstadosPolizas = await dbContext.EstadosPoliza.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, listaEstadosPolizas);
        }
    }
}
