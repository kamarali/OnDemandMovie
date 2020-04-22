using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using WebAPI.Infrastructure;
using WebAPI.Models;
using WebAPI.Service;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/accounts")]
    public class AccountsController : BaseApiController
    {
        AccountsServices accountsServices;

        public AccountsController()
        {
            accountsServices = new AccountsServices();
        }

        [Route("users")]
        public IHttpActionResult GetUsers()
        {
            return Ok(this.AppUserManager.Users.ToList().Select(u => modelFactory.Create(u)));
        }

        [Route("userlogin")]
        [HttpPost]
        public async Task<IHttpActionResult> GetLogin()
        {
            var httpBody = ControllerContext.Request.Content.ReadAsStringAsync().Result;
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(httpBody);
            var user = await accountsServices.GetLogin(dictionary);
            if(user!= null)
            {
                return Ok(user);
            }
            return NotFound();
        }



        [Route("registerUser")]
        [HttpPost]
        public async Task<IHttpActionResult> RegisterUser()
        {
            var httpBody = ControllerContext.Request.Content.ReadAsStringAsync().Result;
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(httpBody);
            var newUser = await accountsServices.RegisterUser(dictionary);
            return Ok(newUser);
        }

        [Route("user/{id:guid}", Name = "GetUserById")]
        public async Task<IHttpActionResult> GetUser(string Id)
        {
            var user = await accountsServices.GetUser(Id);

            if (user != null)
            {
                return Ok(user);
            }

            return NotFound();

        }

        [Route("user/{username}")]
        public async Task<IHttpActionResult> GetUserByName(string username)
        {
            var user = await accountsServices.GetUserByName(username);

            if (user != null)
            {
                return Ok(user);
            }

            return NotFound();

        }


        [Route("create")]
        public async Task<IHttpActionResult> CreateUser(CreateUserBindingModel createUserModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await accountsServices.CreateUser(createUserModel);

            if (user == null)
            {
                return NotFound(); 
            }
            return Ok(user);
        }


        [Route("fetchAllUsers")]
        [HttpPost]
        public IHttpActionResult fetchAllUsers()
        {
            return Ok(accountsServices.fetchAllUsers());
        }

        [Route("fetchUsersRole")]
        [HttpPost]
        public IHttpActionResult fetchUsersRole()
        {
            var httpBody = ControllerContext.Request.Content.ReadAsStringAsync().Result;
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(httpBody);
            var usersWithRoles = accountsServices.fetchUsersRole(dictionary);
            return Ok(usersWithRoles);
        }

        [Route("giveAdminRole")]
        [HttpPost]
        public async Task<IHttpActionResult> giveAdminRole()
        {
            var httpBody = ControllerContext.Request.Content.ReadAsStringAsync().Result;
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(httpBody);
            var usersWithRoles = await accountsServices.giveAdminRole(dictionary);
            return Ok(usersWithRoles);
        }

        [Route("removeAdminRole")]
        [HttpPost]
        public async Task<IHttpActionResult> removeAdminRole()
        {
            var httpBody = ControllerContext.Request.Content.ReadAsStringAsync().Result;
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(httpBody);
            var usersWithRoles = await accountsServices.removeAdminRole(dictionary);
            return Ok(usersWithRoles);
        }

        [Route("isInRole")]
        [HttpPost]
        public async Task<IHttpActionResult> isInRole()
        {
            var httpBody = ControllerContext.Request.Content.ReadAsStringAsync().Result;
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(httpBody);
            var result = await accountsServices.isInRole(dictionary);         
            return Ok(result);
        }
    }
}
