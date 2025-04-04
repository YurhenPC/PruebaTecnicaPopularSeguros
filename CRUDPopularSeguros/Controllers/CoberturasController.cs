using CRUDPopularSeguros.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUDPopularSeguros.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoberturasController : ControllerBase
    {
        private readonly PruebaTecnicaPopularSegurosContext dbContext;
        public CoberturasController(PruebaTecnicaPopularSegurosContext _dbContext)
        {
            dbContext = _dbContext;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Get()
        {
            var listaCoberturas = await dbContext.Coberturas.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, listaCoberturas);
        }
    }
}
