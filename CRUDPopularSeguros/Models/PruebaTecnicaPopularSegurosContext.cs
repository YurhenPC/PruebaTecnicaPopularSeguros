using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CRUDPopularSeguros.Models;

public partial class PruebaTecnicaPopularSegurosContext : DbContext
{
    public PruebaTecnicaPopularSegurosContext()
    {
    }

    public PruebaTecnicaPopularSegurosContext(DbContextOptions<PruebaTecnicaPopularSegurosContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<Cobertura> Coberturas { get; set; }

    public virtual DbSet<Estado> Estados { get; set; }

    public virtual DbSet<Poliza> Polizas { get; set; }

    public virtual DbSet<TipoPoliza> TipoPolizas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-TUQ4266;Initial Catalog=PruebaTecnicaPopularSeguros;Integrated Security=True;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.CedulaAsegurado);

            entity.ToTable("Cliente");

            entity.Property(e => e.CedulaAsegurado)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PrimerApellido)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SegundoApellido)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Cobertura>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Codigo)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Estado>(entity =>
        {
            entity.ToTable("Estado");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.Estado1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Estado");
        });

        modelBuilder.Entity<Poliza>(entity =>
        {
            entity.HasKey(e => e.NumeroPoliza);

            entity.Property(e => e.NumeroPoliza)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Aseguradora)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CedulaAsegurado)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.MontoAsegurado).HasColumnType("decimal(18, 3)");
            entity.Property(e => e.Prima).HasColumnType("decimal(18, 3)");
        });

        modelBuilder.Entity<TipoPoliza>(entity =>
        {
            entity.ToTable("TipoPoliza");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Codigo)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
