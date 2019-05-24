using System;
using System.Collections.Generic;

namespace Ticketing_App.Models
{
    public partial class IncidentConversation
    {
        public int Id { get; set; }
        public string IncidentCode { get; set; }
        public string RaisedBy { get; set; }
        public string commentedBy { get; set; }
        public string comment { get; set; }
        public string ResolvedBy { get; set; }
        public string ResolveDescription { get; set; }
        public string ResponseBy { get; set; }
        public string ResponseDescription { get; set; }
        public string Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? IncidentId { get; set; }
        public Incident Incident { get; set; }

    }
}
