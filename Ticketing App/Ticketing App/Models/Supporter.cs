using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;

namespace Ticketing_App.Models
{
    [Authorize]
    public partial class Supporter
    {
        public string SupporterId { get; set; }
        public string SupporterName { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
        public bool Active { get; set; }
        public bool? IsPasswordChangeNeeded { get; set; }
    }
}
