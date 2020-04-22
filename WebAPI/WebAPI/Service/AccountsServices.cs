using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using WebAPI.Infrastructure;
using WebAPI.Models;

namespace WebAPI.Service
{
    public class AccountsServices
    {
        private ApplicationDbContext context;

        private ModelFactory _modelFactory;
        private ApplicationUserManager AppUserManager = null;



        public AccountsServices()
        {
            context = new ApplicationDbContext();
            AppUserManager = new ApplicationUserManager(new UserStore<ApplicationUser>(new ApplicationDbContext()));
        }

        protected ModelFactory modelFactory
        {
            get
            {
                if (_modelFactory == null)
                {
                    _modelFactory = new ModelFactory(AppUserManager);
                }
                return _modelFactory;
            }
        }



        public async Task<dynamic> GetLogin(Dictionary<string, object> dictionary)
        {
            string email = dictionary["userName"].ToString();
            string password = dictionary["password"].ToString();
            var user = await AppUserManager.FindByEmailAsync(email);
            if (user != null)
            {
                var isAuthenticated = await AppUserManager.FindAsync(user.UserName, password);
                if (isAuthenticated != null)
                {

                    ClaimsIdentity identity = await AppUserManager.CreateIdentityAsync(
                                        user,
                                        DefaultAuthenticationTypes.ExternalBearer);
                    return modelFactory.Create(user);

                }
            }
            return null;
        }

        public async Task<dynamic> RegisterUser(Dictionary<string, object> dictionary)
        {
            string Email = dictionary["Email"].ToString();

            var user = await AppUserManager.FindByEmailAsync(Email);
            if (user != null)
            {
                return modelFactory.Create(user);
            }
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
            user = new ApplicationUser()
            {
                UserName = dictionary["userName"].ToString(),
                Email = Email,
                EmailConfirmed = true,
                FirstName = dictionary["firstName"].ToString(),
                LastName = dictionary["lastName"].ToString(),
                Level = 1,
                JoinDate = DateTime.Now.AddYears(-3)
            };

            manager.Create(user, dictionary["password"].ToString());
            var newUser = modelFactory.Create(user);
            var result = await AppUserManager.AddToRoleAsync(newUser.Id, "Viewer");
            return newUser;
        }

        public async Task<dynamic> GetUser(string Id)
        {
            var user = await AppUserManager.FindByIdAsync(Id);

            if (user != null)
            {
                return modelFactory.Create(user);
            }

            return null;
        }

        public async Task<dynamic> GetUserByName(string username)
        {
            var user = await AppUserManager.FindByNameAsync(username);

            if (user != null)
            {
                return modelFactory.Create(user);
            }

            return null;
        }

        public async Task<dynamic> CreateUser(CreateUserBindingModel createUserModel)
        {

            var user = new ApplicationUser()
            {
                UserName = createUserModel.Username,
                Email = createUserModel.Email,
                FirstName = createUserModel.FirstName,
                LastName = createUserModel.LastName,
                Level = 3,
                JoinDate = DateTime.Now.Date,
            };

            IdentityResult addUserResult = await AppUserManager.CreateAsync(user, createUserModel.Password);

            if (!addUserResult.Succeeded)
            {
                return null;
            }

            return modelFactory.Create(user);
        }

        public dynamic fetchAllUsers()
        {
            var roles = context.Roles.ToList();
            var usersWithRoles =  (from user in context.Users
                                  select new
                                  {
                                      UserId = user.Id,
                                      Username = user.UserName,
                                      Email = user.Email,
                                      Firstname = user.FirstName,
                                      Lastname = user.LastName,
                                      RoleNames = (from userRole in user.Roles
                                                   join role in context.Roles on userRole.RoleId
                                                   equals role.Id
                                                   select role.Name).ToList()
                                  }).ToList().Select(p => new

                                  {
                                      UserId = p.UserId,
                                      Username = p.Username,
                                      Email = p.Email,
                                      Firstname = p.Firstname,
                                      Lastname = p.Lastname,
                                      Role = string.Join(",", p.RoleNames)
                                  });
            return usersWithRoles;
        }

        public dynamic fetchUsersRole(Dictionary<string, object> dictionary)
        {

            string userId = dictionary["userId"].ToString();
            var roles = context.Roles.ToList();
            var usersWithRoles = (from user in context.Users
                                  where user.Id == userId
                                  select new
                                  {
                                      UserId = user.Id,
                                      Username = user.UserName,
                                      Email = user.Email,
                                      Firstname = user.FirstName,
                                      Lastname = user.LastName,
                                      RoleNames = (from userRole in user.Roles
                                                   join role in context.Roles on userRole.RoleId
                                                   equals role.Id
                                                   select role.Name).ToList()
                                  }).ToList().Select(p => new

                                  {
                                      UserId = p.UserId,
                                      Username = p.Username,
                                      Email = p.Email,
                                      Firstname = p.Firstname,
                                      Lastname = p.Lastname,
                                      Role = string.Join(",", p.RoleNames)
                                  });
            return usersWithRoles;
        }

        public async Task<dynamic> giveAdminRole(Dictionary<string, object> dictionary)
        {
            string userId = dictionary["userId"].ToString();
            var roles = context.Roles.ToList();
            var result = await AppUserManager.AddToRoleAsync(userId, "Admin");
            var usersWithRoles = (from user in context.Users
                                  where user.Id == userId
                                  select new
                                  {
                                      UserId = user.Id,
                                      Username = user.UserName,
                                      Email = user.Email,
                                      Firstname = user.FirstName,
                                      Lastname = user.LastName,
                                      RoleNames = (from userRole in user.Roles
                                                   join role in context.Roles on userRole.RoleId
                                                   equals role.Id
                                                   select role.Name).ToList()
                                  }).ToList().Select(p => new

                                  {
                                      UserId = p.UserId,
                                      Username = p.Username,
                                      Email = p.Email,
                                      Firstname = p.Firstname,
                                      Lastname = p.Lastname,
                                      Role = string.Join(",", p.RoleNames)
                                  });
            return usersWithRoles;
        }

        public async Task<dynamic> removeAdminRole(Dictionary<string, object> dictionary)
        {
            string userId = dictionary["userId"].ToString();
            var roles = context.Roles.ToList();
            var result = await AppUserManager.RemoveFromRoleAsync(userId, "Admin");
            var usersWithRoles = (from user in context.Users
                                  where user.Id == userId
                                  select new
                                  {
                                      UserId = user.Id,
                                      Username = user.UserName,
                                      Email = user.Email,
                                      Firstname = user.FirstName,
                                      Lastname = user.LastName,
                                      RoleNames = (from userRole in user.Roles
                                                   join role in context.Roles on userRole.RoleId
                                                   equals role.Id
                                                   select role.Name).ToList()
                                  }).ToList().Select(p => new

                                  {
                                      UserId = p.UserId,
                                      Username = p.Username,
                                      Email = p.Email,
                                      Firstname = p.Firstname,
                                      Lastname = p.Lastname,
                                      Role = string.Join(",", p.RoleNames)
                                  });
            return usersWithRoles;
        }


        public async Task<dynamic> isInRole(Dictionary<string, object> dictionary)
        {

            string userId = dictionary["userId"].ToString();
            string role = dictionary["role"].ToString();
            var roles = context.Roles.ToList();
            var result = await AppUserManager.IsInRoleAsync(userId, role);
            return result;
        }
    }
}