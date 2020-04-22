using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Infrastructure;
using WebAPI.Models;
//using WebAPI.EFModels;
using WebAPI.Service;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/data")]
    public class DataController : ApiController
    {
        DataServices service;
        
        DataController()
        {
            service = new DataServices();
        }

        [Authoriz]
        [Route("getVideos")]
        [HttpGet]
        public IHttpActionResult GetVideos(int categoryId)
        {
            return Ok(service.GetVideos(categoryId));
        }

        [Authoriz]
        [Route("createvideo")]
        [HttpPost]
        public IHttpActionResult CreateVideo()
        {
            var httpBody = ControllerContext.Request.Content.ReadAsStringAsync().Result;
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(httpBody);
            return Ok(service.CreateVideo(dictionary));
        }

        [Authoriz]
        [Route("updatevideo")]
        [HttpPost]
        public IHttpActionResult UpdateVideo()
        {
            var httpBody = ControllerContext.Request.Content.ReadAsStringAsync().Result;
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(httpBody);
            return Ok(service.UpdateVideo(dictionary));
        }

        [Authoriz]
        [Route("checkVideo")]
        [HttpPost]
        public IHttpActionResult checkVideo()
        {
            var httpBody = ControllerContext.Request.Content.ReadAsStringAsync().Result;
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(httpBody);
            return Ok(service.FindVideoByName(dictionary));
        }

        [Authoriz]
        [Route("removeVideo")]
        [HttpPost]
        public IHttpActionResult RemoveVideo()
        {
            var httpBody = ControllerContext.Request.Content.ReadAsStringAsync().Result;
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(httpBody);
            return Ok(service.RemoveVideo(dictionary));
        }

        [Authoriz]
        [Route("categories")]
        [HttpGet]
        public IHttpActionResult GetCategories()
        {
            var categories = service.GetCategories();
            return Ok(categories);
        }

        [Authoriz]
        [Route("createCategory")]
        [HttpPost]
        public IHttpActionResult CreateCategory()
        {
            var httpBody = ControllerContext.Request.Content.ReadAsStringAsync().Result;
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(httpBody);
            return Ok(service.CreateCategory(dictionary));
        }

        [Authoriz]
        [Route("updateCategory")]
        [HttpPost]
        public IHttpActionResult UpdateCategory()
        {
            var httpBody = ControllerContext.Request.Content.ReadAsStringAsync().Result;
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(httpBody);
            return Ok(service.UpdateCategory(dictionary));
        }

        [Authoriz]
        [Route("checkCategory")]
        [HttpPost]
        public IHttpActionResult checkCategory()
        {
            var httpBody = ControllerContext.Request.Content.ReadAsStringAsync().Result;
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(httpBody);
            return Ok(service.FindByName(dictionary));
        }

        [Authoriz]
        [Route("removeCategory")]
        [HttpPost]
        public IHttpActionResult RemoveCategory()
        {
            var httpBody = ControllerContext.Request.Content.ReadAsStringAsync().Result;
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(httpBody);
            return Ok(service.RemoveCategory(dictionary));
        }


        [Authoriz]
        [Route("addWAtchHistory")]
        [HttpPost]
        public IHttpActionResult AddWAtchHistory()
        {
            var httpBody = ControllerContext.Request.Content.ReadAsStringAsync().Result;
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(httpBody);
            return Ok(service.AddWAtchHistory(dictionary));
        }

        [Authoriz]
        [Route("trendingVideos")]
        [HttpPost]
        public IHttpActionResult trendingVideos()
        {
            var httpBody = ControllerContext.Request.Content.ReadAsStringAsync().Result;
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(httpBody);
            return Ok(service.getTrendingVideos(dictionary));
        }
    }
}
