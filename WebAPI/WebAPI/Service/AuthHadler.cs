using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace WebAPI.Service
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple =false)]
    public class Authoriz : AuthorizationFilterAttribute
    {
        /// <summary>  
        /// This will Authorize User  
        /// </summary>  
        /// <returns></returns>  
        public override void OnAuthorization(HttpActionContext filterContext)
        {
            String authTokens = string.Empty;
            String userAget = string.Empty;

            if (filterContext != null)
            {
                
                var headerToken = filterContext.Request.Headers.SingleOrDefault(x => x.Key == authTokens);
                if(headerToken.Key != null)
                {
                    authTokens = Convert.ToString(headerToken.Value.SingleOrDefault());
                    userAget = Convert.ToString(filterContext.Request.Headers.UserAgent);
                    if (!IsValidToken(authTokens))
                    {
                        filterContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                        return;
                    }
                    else {
                        base.OnAuthorization(filterContext);
                        return;
                    }
                }
                else
                {
                    //filterContext.Response = new HttpResponseMessage(HttpStatusCode.Forbidden);
                    base.OnAuthorization(filterContext);
                    return;
                }
               // base.OnAuthorization(filterContext);
            }
        }

        public bool IsValidToken(string authToken)
        { 
            return true;
        }

        public string getAuthToken(string token)
        {
            return String.Empty;

        }


    }
}