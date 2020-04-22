//namespace WebAPI.Migrations
//{
//    using Microsoft.AspNet.Identity;
//    using Microsoft.AspNet.Identity.EntityFramework;
//    using Owin;
//    using System;
//    using System.Data.Entity;
//    using System.Data.Entity.Migrations;
//    using System.Linq;
//    using System.Web.Http;
//    using WebAPI.Infrastructure;

//    internal sealed class Configuration2 : DbMigrationsConfiguration<WebAPI.Infrastructure.ApplicationDbContext>
//    {
//        public Configuration2()
//        {
//            AutomaticMigrationsEnabled = false;
//        }

 

//        protected override void Seed(WebAPI.Infrastructure.ApplicationDbContext context)
//        {
//            //  This method will be called after migrating to the latest version.

//            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

//            var user = new ApplicationUser()
//            {
//                UserName = "SuperPowerUser",
//                Email = "kamarali.dukandar@ey.com",
//                EmailConfirmed = true,
//                FirstName = "Kamarali",
//                LastName = "Dukadar",
//                Level = 1,
//                JoinDate = DateTime.Now.AddYears(-3)
//            };

//            manager.Create(user, "SuperP@ssword!");
//        }
//    }
//}
