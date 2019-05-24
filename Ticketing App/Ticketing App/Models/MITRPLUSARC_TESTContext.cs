using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Ticketing_App.Models
{
    public partial class MITRPLUSARC_TESTContext : DbContext
    {
        public MITRPLUSARC_TESTContext()
        {
        }

        public MITRPLUSARC_TESTContext(DbContextOptions<MITRPLUSARC_TESTContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Incident> Incident { get; set; }
        public virtual DbSet<IncidentConversation> IncidentConversation { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=45.114.245.80;Initial Catalog=MITRPLUSARC_TEST;Persist Security Info=True;User ID=MITRAdmin;Password=MITRAdmin@123");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Incident>(entity =>
            {
                entity.Property(e => e.IncidentId).ValueGeneratedNever();

                entity.Property(e => e.Category).HasMaxLength(32);

                entity.Property(e => e.ConfirmBy).HasMaxLength(32);

                entity.Property(e => e.ConfirmDateTime).HasColumnType("datetime");

                entity.Property(e => e.FileName).HasMaxLength(550);

                entity.Property(e => e.IncidentCode).HasMaxLength(8);

                entity.Property(e => e.ModuleName).HasMaxLength(50);

                entity.Property(e => e.Priority).HasMaxLength(16);

                entity.Property(e => e.RaisedBy).HasMaxLength(32);

                entity.Property(e => e.RaisedDateTime).HasColumnType("datetime");

                entity.Property(e => e.ResolvedBy).HasMaxLength(20);

                entity.Property(e => e.ResolvedDateTime).HasColumnType("datetime");

                entity.Property(e => e.ResponseBy).HasMaxLength(20);

                entity.Property(e => e.ResponseDateTime).HasColumnType("datetime");

                entity.Property(e => e.Status).HasMaxLength(32);
            });

            modelBuilder.Entity<IncidentConversation>(entity =>
            {
                entity.ToTable("incidentConversation");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreatedDate)
                    .HasColumnName("createdDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.IncidentCode)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.RaisedBy)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ResolvedBy)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ResponseBy)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.Incident)
                    .WithMany(p => p.IncidentConversation)
                    .HasForeignKey(d => d.IncidentId)
                    .HasConstraintName("FK__incidentC__Incid__22A007F5");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.Userid);

                entity.ToTable("users");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.Property(e => e.CreatedDate)
                    .HasColumnName("createdDate")
                    .HasColumnType("date");

                entity.Property(e => e.Createdby)
                    .HasColumnName("createdby")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EmailId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy)
                    .HasColumnName("modifiedBy")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate)
                    .HasColumnName("modifiedDate")
                    .HasColumnType("date");

                entity.Property(e => e.Password)
                    .HasColumnName("password")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .HasColumnName("username")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });
        }
    }
}
