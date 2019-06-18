using System;
using System.Collections.Generic;

namespace Ticketing_App.Models
{
    public partial class IncidentDocuments
    {
        public Guid DocumentId { get; set; }
        public Guid IncidentId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public DateTime? CreateDate { get; set; }
    }
}
