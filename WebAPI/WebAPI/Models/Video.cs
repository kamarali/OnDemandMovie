using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    [Table("tblVideo")]
    public partial class Video
    {
        [Key]
        public int VID { get; set; }        
        public Nullable<int> CategoryID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int isDeleted { get; set; }
        public string UserId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }

    }
}