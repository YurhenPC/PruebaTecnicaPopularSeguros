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
    {
    
    }
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

            entity.HasOne(d => d.CoberturasNavigation).WithMany(p => p.Polizas)
                .HasForeignKey(d => d.Coberturas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Polizas_Coberturas");

            entity.HasOne(d => d.EstadoPolizaNavigation).WithMany(p => p.Polizas)
                .HasForeignKey(d => d.EstadoPoliza)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Polizas_Estado");

            entity.HasOne(d => d.TipoPolizaNavigation).WithMany(p => p.Polizas)
                .HasForeignKey(d => d.TipoPoliza)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Polizas_TipoPoliza");
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
