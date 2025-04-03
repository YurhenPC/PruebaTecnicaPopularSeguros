using System;
using System.Collections.Generic;

namespace CRUDPopularSeguros.Models;

public partial class Cliente
{
    public string CedulaAsegurado { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public string PrimerApellido { get; set; } = null!;

    public string SegundoApellido { get; set; } = null!;

    public int TipoPersona { get; set; }

    public DateTime FechaNacimiento { get; set; }
}
