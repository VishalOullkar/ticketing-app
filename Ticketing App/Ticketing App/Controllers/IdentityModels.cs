﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ticketing_App.Controllers
{
    //public class IdentityModels
    //{
    //}
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {

        public ApplicationDbContext()
        //   : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);
        //    //AspNetUsers -> User
        //    modelBuilder.Entity<ApplicationUser>()
        //        .ToTable("User");
        //    //AspNetRoles -> Role
        //    modelBuilder.Entity<IdentityRole>()
        //        .ToTable("Role");
        //    //AspNetUserRoles -> UserRole
        //    modelBuilder.Entity<IdentityUserRole>()
        //        .ToTable("UserRole");
        //    //AspNetUserClaims -> UserClaim
        //    modelBuilder.Entity<IdentityUserClaim>()
        //        .ToTable("UserClaim");
        //    //AspNetUserLogins -> UserLogin
        //    modelBuilder.Entity<IdentityUserLogin>()
        //        .ToTable("UserLogin");
        //}
    }

}
