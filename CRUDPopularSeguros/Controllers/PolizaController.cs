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
            var listaPolizas = await dbContext.Polizas.Include(x=> x.Cliente).Select(x => new
            {
                x.NumeroPoliza, x.Cliente.CedulaAsegurado, x.FechaVencimiento, x.TipoPoliza, x.Cliente.Nombre,
                x.Cliente.PrimerApellido, x.Cliente.SegundoApellido, x.MontoAsegurado, x.FechaInclusion, x.FechaEmision,
                x.Coberturas, x.EstadoPoliza, x.Periodo, x.Prima,x.Aseguradora
            })

                .ToListAsync();
            return StatusCode(StatusCodes.Status200OK, listaPolizas);
        }

        [HttpGet]
        [Route("Obtener/{cedulaAsegurado}")]
        public async Task<IActionResult> GetObtener(String cedulaAsegurado)
        {
            var poliza = await dbContext.Polizas.FirstOrDefaultAsync(e => e.CedulaAsegurado == cedulaAsegurado);
            return StatusCode(StatusCodes.Status200OK, poliza);
        }



        [HttpPost]
        [Route("Nuevo")]
        public async Task<IActionResult> Nuevo([FromBody] Poliza objeto)
        {
            if (objeto == null)
                return BadRequest("Datos inválidos");

            var clienteExistente = await dbContext.Clientes
                .FirstOrDefaultAsync(c => c.CedulaAsegurado == objeto.CedulaAsegurado);

            if (clienteExistente == null)
            {
                dbContext.Clientes.Add(objeto.Cliente);
            }
            else
            {
                objeto.Cliente = clienteExistente;
            }

            await dbContext.Polizas.AddAsync(objeto);
            await dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, new { mensaje = "Polizada creada correctamente" });
        }


        [HttpPut]
        [Route("Editar/{numeroPoliza}")]
        public async Task<IActionResult> Editar(String numeroPoliza, [FromBody] Poliza objeto)
        {
            var existePoliza = await dbContext.Polizas.FirstOrDefaultAsync(e => e.NumeroPoliza == numeroPoliza);

            if (existePoliza == null)
            {
                return NotFound(new { mensaje = "Póliza no encontrada" });
            }

            // Actualizar los campos
            existePoliza.TipoPoliza = objeto.TipoPoliza;
            existePoliza.CedulaAsegurado = objeto.CedulaAsegurado;
            existePoliza.MontoAsegurado = objeto.MontoAsegurado;
            existePoliza.FechaVencimiento = objeto.FechaVencimiento;
            existePoliza.FechaEmision = objeto.FechaEmision;
            existePoliza.Coberturas = objeto.Coberturas;
            existePoliza.EstadoPoliza = objeto.EstadoPoliza;
            existePoliza.Prima = objeto.Prima;
            existePoliza.Periodo = objeto.Periodo;
            existePoliza.FechaInclusion = objeto.FechaInclusion;
            existePoliza.Aseguradora = objeto.Aseguradora;

            //dbContext.Polizas.Update(objeto);
            await dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new { mensaje = "Póliza actualizada correctamente" });
        }

        [HttpDelete]
        [Route("Eliminar/{cedulaAsegurado}")]
        public async Task<IActionResult> Eliminar(String cedulaAsegurado)
        {
            var poliza = await dbContext.Polizas.FirstOrDefaultAsync(e => e.CedulaAsegurado == cedulaAsegurado);
            dbContext.Polizas.Remove(poliza);
            await dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
        }

    }
}
