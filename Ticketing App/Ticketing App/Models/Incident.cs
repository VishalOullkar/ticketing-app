using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;

namespace Ticketing_App.Models
{
    [Authorize]
    public partial class Incident
    {
        public Incident()
        {
            IncidentConversation = new HashSet<IncidentConversation>();
        }

        public string IncidentCode { get; set; }
        public string Category { get; set; }
        public string Priority { get; set; }
        public string ProblemDescription { get; set; }
        public DateTime? RaisedDateTime { get; set; }
        public string RaisedBy { get; set; }
        public string ResolveDescription { get; set; }
        public DateTime? ResolvedDateTime { get; set; }
        public string ResolvedBy { get; set; }
        public string ResponseDescription { get; set; }
        public DateTime? ResponseDateTime { get; set; }
        public string ResponseBy { get; set; }
        public string Status { get; set; }
        public string RaisedByName { get; set; }
        public string ModuleName { get; set; }
        public string Link { get; set; }
        public string ConfirmBy { get; set; }
        public DateTime? ConfirmDateTime { get; set; }
        public Guid IncidentId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string EmailId { get; set; }
        public string MobileNo { get; set; }

        public ICollection<IncidentConversation> IncidentConversation { get; set; }
    }
}
