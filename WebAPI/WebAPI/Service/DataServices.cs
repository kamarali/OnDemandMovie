using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebAPI.Infrastructure;
using WebAPI.Models;

namespace WebAPI.Service
{
    public class DataServices
    {
        private ApplicationDbContext repository;
        public DataServices()
        {
            repository = new ApplicationDbContext();
        }
        
        public dynamic GetVideos(int categoryId)
        {
            var movies = from videos in repository.Videos.Where(v => v.isDeleted != 1)
                         join category in repository.Categories.Where(c => c.isDeleted == 0) on videos.CategoryID equals category.ID
                         select new
                         {
                             CategoryID = videos.CategoryID,
                             VID = videos.VID,
                             Name = videos.Name,
                             Description = videos.Description,
                             CategoryName = category.CategoryName
                         };
            if (categoryId > 0)
            {
                return (movies.Where(c => c.CategoryID == categoryId).Select(y => new { Id = y.VID, Name = y.Name, Category = y.CategoryID, CategoryName = y.CategoryName, Description = y.Description }).ToList<dynamic>());
            }
            return (movies.Select(y => new { Id = y.VID, Name = y.Name, Category = y.CategoryID, CategoryName = y.CategoryName, Description = y.Description }).ToList<dynamic>());
        }

        public dynamic CreateVideo(Dictionary<string, object> dictionary)
        {
            Video video = new Video();
            video.CategoryID = Convert.ToInt32(dictionary["selectedCategory"]);
            video.Name = dictionary["name"].ToString();
            video.Description = dictionary["description"].ToString();
            video.isDeleted = 0;
            video.UserId = dictionary["userId"].ToString();
            video.CreatedBy = dictionary["createdBy"].ToString();
            video.CreatedDate = DateTime.Now;
            video.UpdatedBy = null;
            video.UpdatedDate = DateTime.Now;
            repository.Videos.Add(video);
            var result = repository.SaveChanges();
            if (result>0)
            {
                return true;
            }
            return false;
        }

        public dynamic UpdateVideo(Dictionary<string, object> dictionary)
        {
            int videoId = Convert.ToInt32(dictionary["id"]);         
            var video = repository.Videos.Where(c => c.isDeleted != 1 && c.VID == videoId).FirstOrDefault();
            video.CategoryID = Convert.ToInt32(dictionary["selectedCategory"]);
            video.Name = dictionary["name"].ToString();
            video.Description = dictionary["description"].ToString();
            video.isDeleted = 0;
            video.UserId = dictionary["userId"].ToString();
            video.CreatedDate = DateTime.Now;
            video.UpdatedBy = null;
            video.UpdatedDate = DateTime.Now;   
            var result = repository.SaveChanges();
            if (result > 0)
            {
                return true;
            }
            return false;
        }

        public dynamic FindVideoByName(Dictionary<string, object> dictionary)
        {
            string videoName = dictionary["name"].ToString();
            var videoEntity = repository.Videos.Where(c => c.Name == videoName).FirstOrDefault();
            if (videoEntity == null)
            {
                return true;
            }
            return false;
        }

        public dynamic RemoveVideo(Dictionary<string, object> dictionary)
        {
            int videoId = Convert.ToInt32(dictionary["id"].ToString());
            repository.Videos.Where(v => v.VID == videoId).FirstOrDefault().isDeleted = 1;
            var result = repository.SaveChanges();
            if (result > 0)
            {
                return true;
            }
            return false;
        }

        public dynamic GetCategories()
        {
            return repository.Categories.Where(c => c.isDeleted != 1).Select(y => new { Id = y.ID, Name = y.CategoryName }).ToList<dynamic>();
        }

        public dynamic CreateCategory(Dictionary<string, object> dictionary)
        {
            Category category = new Category();
            category.CategoryName = dictionary["name"].ToString();
            category.isDeleted = 0;
            category.CreatedBy = dictionary["createdBy"].ToString(); 
            category.UserId = dictionary["userId"].ToString();
            category.CreatedDate = DateTime.Now;
            category.UpdatedBy = null;
            category.UpdatedDate = DateTime.Now;
            repository.Categories.Add(category);
            var result = repository.SaveChanges();
            if (result > 0)
            {
                return true;
            }
            return false;
        }

        public dynamic UpdateCategory(Dictionary<string, object> dictionary)
        {
            Category category = new Category();
            int categoryId = Convert.ToInt32(dictionary["id"].ToString());            
            category.CategoryName = dictionary["name"].ToString();
            category.isDeleted = 0;
            category.UserId = dictionary["userId"].ToString();
            category.UpdatedBy = dictionary["updatedBy"].ToString();
            category.UpdatedDate = DateTime.Now;
            var categoryEntity = repository.Categories.Where(c => c.ID == categoryId).FirstOrDefault();
            categoryEntity.CategoryName = category.CategoryName;
            categoryEntity.UserId = category.UserId;
            categoryEntity.UpdatedBy = category.UpdatedBy;
            categoryEntity.UpdatedDate = category.UpdatedDate;
            var result = repository.SaveChanges();
            if (result > 0)
            {
                return true;
            }
            return false;
        }


        public dynamic FindByName(Dictionary<string, object> dictionary)
        {
            string categoryName = dictionary["name"].ToString();
            var categoryEntity = repository.Categories.Where(c => c.CategoryName == categoryName).FirstOrDefault();
            if (categoryEntity == null)
            {
                return true;
            }
            return false;
        }

        public dynamic RemoveCategory(Dictionary<string, object> dictionary)
        {
            int categoryId = Convert.ToInt32(dictionary["id"].ToString());
            repository.Categories.Where(c => c.ID == categoryId).FirstOrDefault().isDeleted = 1;
            var result = repository.SaveChanges();
            if (result > 0)
            {
                return true;
            }
            return false;
        }

        public dynamic AddWAtchHistory(Dictionary<string, object> dictionary)
        {
            WatchHistory watchHistory = new WatchHistory();
            watchHistory.VideoID = Convert.ToInt32(dictionary["id"].ToString());
            watchHistory.CategoryID = Convert.ToInt32(dictionary["category"].ToString());
            watchHistory.UserId = dictionary["userId"].ToString();
            watchHistory.WatchDate = DateTime.Now;
            repository.WatchHistories.Add(watchHistory);
            var result = repository.SaveChanges();
            if (result > 0)
            {
                return true;
            }
            return false;
        }

        public dynamic getTrendingVideos(Dictionary<string, object> dictionary)
        {
            var results = from watchHistory in repository.WatchHistories                          
                          group watchHistory by watchHistory.VideoID into  watchGroup
                          join videos in repository.Videos.Where( v => v.isDeleted == 0) on watchGroup.Key equals videos.VID
                          join category in repository.Categories.Where( c => c.isDeleted == 0) on videos.CategoryID equals category.ID 
                          orderby watchGroup.Count() descending
                          select new
                          {
                              Name = videos.Name,
                              Category = category.CategoryName,
                              VideoId = watchGroup.Key,
                              WatchCount = watchGroup.Count()
                          };
            return results;
        }

    }
}