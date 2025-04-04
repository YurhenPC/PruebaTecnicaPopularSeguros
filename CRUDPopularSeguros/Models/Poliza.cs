using System;
using System.Collections.Generic;

namespace CRUDPopularSeguros.Models;

public partial class Poliza
{
    public string NumeroPoliza { get; set; } = null!;

    public int TipoPoliza { get; set; }

    public string CedulaAsegurado { get; set; } = null!;

    public decimal MontoAsegurado { get; set; }

    public DateTime FechaVencimiento { get; set; }

    public DateTime FechaEmision { get; set; }

    public int Coberturas { get; set; }

    public int EstadoPoliza { get; set; }

    public decimal Prima { get; set; }

    public DateTime Periodo { get; set; }

    public DateTime FechaInclusion { get; set; }

    public string Aseguradora { get; set; } = null!;

    public Cliente Cliente { get; set; }
}
