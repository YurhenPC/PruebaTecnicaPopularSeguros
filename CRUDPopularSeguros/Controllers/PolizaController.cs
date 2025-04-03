using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CRUDPopularSeguros.Models;
using Microsoft.EntityFrameworkCore;

namespace CRUDPopularSeguros.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PolizaController : ControllerBase
    {
        private readonly PruebaTecnicaPopularSegurosContext dbContext;
        public PolizaController(PruebaTecnicaPopularSegurosContext _dbContext)
        {
            dbContext = _dbContext;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Get()
        {
            var listaPolizas = await dbContext.Polizas.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, listaPolizas);
        }

        [HttpGet]
        [Route("Obtener/{cedulaAsegurado}")]
        public async Task<IActionResult> GetObtener(String cedula)
        {
            var poliza = await dbContext.Polizas.FirstOrDefaultAsync(e => e.CedulaAsegurado == cedula);
            return StatusCode(StatusCodes.Status200OK, poliza);
        }



        [HttpPost]
        [Route("Nuevo")]
        public async Task<IActionResult> Nuevo([FromBody] Poliza objeto)
        {
            await dbContext.Polizas.AddAsync(objeto);
            await dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
        }


        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] Poliza objeto)
        {
            dbContext.Polizas.Update(objeto);
            await dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
        }

        [HttpDelete]
        [Route("Eliminar/{cedulaAsegurado}")]
        public async Task<IActionResult> Eliminar(String cedula)
        {
            var poliza = await dbContext.Polizas.FirstOrDefaultAsync(e => e.CedulaAsegurado == cedula);
            dbContext.Polizas.Remove(poliza);
            await dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
        }

    }
}
