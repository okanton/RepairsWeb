﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using RepairsData.RepairsContext.Models;

#nullable disable

namespace RepairsData.RepairsContext
{
    public partial class RepairsContext : DbContext
    {
        public RepairsContext(DbContextOptions<RepairsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Addresses> Addresses { get; set; }
        public virtual DbSet<ApprovalStatuses> ApprovalStatuses { get; set; }
        public virtual DbSet<DeviceTypes> DeviceTypes { get; set; }
        public virtual DbSet<Limits> Limits { get; set; }
        public virtual DbSet<Mails> Mails { get; set; }
        public virtual DbSet<Organizations> Organizations { get; set; }
        public virtual DbSet<Refillings> Refillings { get; set; }
        public virtual DbSet<Repairs> Repairs { get; set; }
        public virtual DbSet<ServiceTypes> ServiceTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            modelBuilder.Entity<Addresses>(entity =>
            {
                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<ApprovalStatuses>(entity =>
            {
                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<DeviceTypes>(entity =>
            {
                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Limits>(entity =>
            {
                entity.Property(e => e.DateFrom).HasColumnType("date");

                entity.Property(e => e.DateTo).HasColumnType("date");

                entity.Property(e => e.Limit).HasColumnType("money");
            });

            modelBuilder.Entity<Mails>(entity =>
            {
                entity.Property(e => e.Mail)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.ServiceType)
                    .WithMany(p => p.Mails)
                    .HasForeignKey(d => d.ServiceTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Mails_MailsType");
            });

            modelBuilder.Entity<Organizations>(entity =>
            {
                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Refillings>(entity =>
            {
                entity.Property(e => e.CreateDate).HasColumnType("date");

                entity.Property(e => e.ExecuteDate).HasColumnType("date");

                entity.Property(e => e.ItUser)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.ItUserDepartment)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.Money).HasColumnType("money");
            });

            modelBuilder.Entity<Repairs>(entity =>
            {
                entity.Property(e => e.Client)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.CreateDate).HasColumnType("date");

                entity.Property(e => e.Department)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.ExecuteDate).HasColumnType("date");

                entity.Property(e => e.ItUser)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.ItUserDepartment)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.Model)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Money).HasColumnType("money");

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.RequestNumber)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Room)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.SerialNumber)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Trouble)
                    .IsRequired()
                    .HasMaxLength(150);
            });

            modelBuilder.Entity<ServiceTypes>(entity =>
            {
                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}