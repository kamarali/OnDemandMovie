using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    [Table("tblWatchHistory")]
    public class WatchHistory
    {
        [Key]
        public int WatchID { get; set; }
        public Nullable<int> CategoryID { get; set; }
        public Nullable<int> VideoID { get; set; }
        public string UserId { get; set; }
        public DateTime WatchDate { get; set; }
    }
}