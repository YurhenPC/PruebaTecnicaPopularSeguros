using System;
using System.Collections.Generic;

namespace CRUDPopularSeguros.Models;

public partial class Cobertura
{
    public int Id { get; set; }

    public string Codigo { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public virtual ICollection<Poliza> Polizas { get; set; } = new List<Poliza>();
}
