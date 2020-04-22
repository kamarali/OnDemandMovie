namespace WebAPI.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using WebAPI.Infrastructure;

    internal sealed class Configuration : DbMigrationsConfiguration<WebAPI.Infrastructure.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(WebAPI.Infrastructure.ApplicationDbContext context)
        {
           // This method will be called after migrating to the latest version.
            var store = new RoleStore<IdentityRole>(context);
            var rolemanager = new RoleManager<IdentityRole>(store);
            var role = new IdentityRole { Name = "Admin" };
            var viewerRole = new IdentityRole { Name = "Viewer" };
            rolemanager.Create(role);
            rolemanager.Create(viewerRole);

            var usermanager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

            var user = new ApplicationUser()
            {
                UserName = "SuperPowerUser",
                Email = "kamarali.dukandar@ey.com",
                EmailConfirmed = true,
                FirstName = "Kamarali",
                LastName = "Dukadar",
                Level = 1,
                JoinDate = DateTime.Now.AddYears(-3)
            };

            usermanager.Create(user, "password1");
            usermanager.AddToRole(user.Id, "Admin");
        }
    }
}
