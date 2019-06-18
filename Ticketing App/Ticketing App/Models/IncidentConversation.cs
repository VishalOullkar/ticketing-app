using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;

namespace Ticketing_App.Models
{
    [Authorize]
    public partial class IncidentConversation
    {
        public int Id { get; set; }
        public string commentedBy { get; set; }
        public string comment { get; set; }
        public string Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? IncidentId { get; set; }
        public Incident Incident { get; set; }

    }
}
