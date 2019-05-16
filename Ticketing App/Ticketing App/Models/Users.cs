using System;
using System.Collections.Generic;

namespace Ticketing_App.Models
{
    public partial class Users
    {
        public int? Userid { get; set; }
        public string Username { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
        public string Createdby { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}
