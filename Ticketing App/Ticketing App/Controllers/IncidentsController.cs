using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ticketing_App.Models;
using System.IO;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Cors;

namespace Ticketing_App.Controllers
{
    [Route("api/Incidents/")]
    [ApiController]
    [EnableCors("EnableCORS")]
    public class IncidentsController : ControllerBase
    {
        private readonly MITRPLUSARC_TESTContext _context;

        public IncidentsController(MITRPLUSARC_TESTContext context)
        {
            _context = context;
        }

        // GET: api/Incidents
        [Route("GetIncidents")]
        [HttpGet]
        public IEnumerable<Incident> GetIncident()
        {
            return _context.Incident.OrderBy(s => s.IncidentCode);
        }

        [Route("getusernameByEmailId/{EmailId}")]
        [HttpGet]
        public IEnumerable<Users> getusernameByEmailId(string EmailId)
        {
            var userid = _context.Users.FromSql("spgetIncidentByEmailId @p0", EmailId);

          return  userid;

        }



        [Route("GetIncidentByEmailId/{EmailId}")]
        [HttpGet]
        public IEnumerable<Incident> GetIncidentByEmailId([FromRoute] string EmailId)
        {

            var raiseticketlist = _context.Incident.FromSql("spgetIncidentByEmailId @p0", EmailId).ToList();

            return raiseticketlist.OrderBy(sl => sl.IncidentCode); ;

        }
        // GET: api/GetNextIncidentId

        [Route("GetNextIncidentId")]
        [HttpGet]
        public List<Incident> GetNextIncidentId()
        {
            var NextIncId = _context.Incident
                .FromSql($"sp_getNextIncidentcode1")
                      .ToList();

            return NextIncId;
        }

        // GET: api/Incidents/5
        [Route("GetIncidentById/{id}")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetIncident([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var incident = await _context.Incident.FindAsync(id);

            if (incident == null)
            {
                return NotFound();
            }

            return Ok(incident);
        }
        [Route("GetRaiseticketbystatus/{Status}")]
        [HttpGet]
        public IEnumerable<Incident> GetRaiseticketbystatus([FromRoute] string Status)
        {

            var raiseticketlist = _context.Incident.FromSql("sp_GetRaiseTicketDetailsByStatus @p0",
              Status).ToList();

            return raiseticketlist.OrderBy(sl => sl.IncidentCode); ;

        }

        // PUT: api/Incidents/5
        [Route("PutIncident/{id}")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIncident([FromRoute] Guid id, [FromBody] Incident incident)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != incident.IncidentId)
            {
                return BadRequest();
            }

            _context.Entry(incident).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IncidentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [Route("upload")]
        [HttpPost, DisableRequestSizeLimit]
        public string upload()
        {

            string ModuleName = Request.Form["ModuleName"];
            string ProblemDescription = Request.Form["ProblemDescription"];
            string Priority = Request.Form["Priority"];
            string RaisedDateTime = Request.Form["RaisedDateTime"];
            string RaisedBy = Request.Form["RaisedBy"];
            string Status = Request.Form["Status"];
            int filecount = Request.Form.Files.Count;
            string Category = Request.Form["Category"];
            string Emailid = Request.Form["Emailid"];
            string MobileNo = Request.Form["MobileNo"];
            Guid IncidentId = Guid.NewGuid();
            _context.Database
            .ExecuteSqlCommand("sp_RegisterIncident1 @p0,@p1,@p2," +
            "@p3,@p4,@p5,@p6,@p7,@p8,@p9,@p10,@p11,@p12",
            Priority, ProblemDescription, RaisedBy, Status, "MITRPLUSARC_TEST", 
            ModuleName, "", IncidentId,"","", Category, Emailid,MobileNo);


            for (int i = 0; filecount > i; i++)
            {
                if (filecount > i)
                {
                    var file = Request.Form.Files[i];
                    string fileName=null; string fullPath=null;
                    if (file.Length > 0)
                    {
                        fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        fullPath = Path.Combine("wwwroot/TicketDocuments", fileName);
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }

                    }
                    _context.Database
                    .ExecuteSqlCommand("sp_SaveIncidentDocuments @p0,@p1,@p2"
                    ,IncidentId, fileName, fullPath);
                   


                }

            }
            return "Success";
        }


        public IEnumerable<FileEntity> GetImage()
        {
            var directoryFiles = Directory.GetFiles("wwwroot/TicketDocuments");
            List<FileEntity> objentity = new List<FileEntity>();
            foreach (var item in directoryFiles)
            {
                // do something here
                string[] f = item.Split('/');
                string[] filename = item.Split('\\');
                objentity.Add(new FileEntity { FilePath = "/" + f[1], FileName = filename[1] });
                //objentity.FilePath= item;//filepath
                //objentity.FileName = f[1];//filename

            }
            return objentity;
        }

        //POST: api/Incidents
        [Route("PostIncidentStatus")]
        [HttpPost]
        public async Task<IActionResult> PostIncidentStatus([FromBody] Incident incident)
        {

            Guid id =incident.IncidentId;
            _context.Database
            .ExecuteSqlCommand("sp_UpdateIncidentStatus @p0,@p1,@p2,@p3,@p4,@p5",
            incident.IncidentCode, incident.Status, incident.RaisedBy, incident.ResolveDescription, incident.ResponseDescription, "MITRPLUSARC_TEST");

            return CreatedAtAction("GetIncident", new { id = incident.IncidentId }, incident);
        }





        // POST: api/Incidents
        [Route("api/Incidents/PostIncident")]
        [HttpPost]
        public async Task<IActionResult> PostIncident( [FromBody] Incident incident)
        {
            int filecount = Request.Form.Files.Count;

            return CreatedAtAction("GetIncident", new { id = incident.IncidentId }, incident);
        }


        // DELETE: api/Incidents/5
        [Route("DeleteIncident/{id}")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncident([FromRoute] Guid id)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            var incident = await _context.Incident.FindAsync(id);
            if (incident == null)
            {
                return NotFound();
            }

            _context.Incident.Remove(incident);
            await _context.SaveChangesAsync();

            return Ok(incident);
        }

        private bool IncidentExists(Guid id)
        {
            return _context.Incident.Any(e => e.IncidentId == id);
        }

        [Route("GetRaiseTicketDocuments/{IncidentId}")]
        [HttpGet]
        public IEnumerable<IncidentDocuments> GetRaiseTicketDocuments([FromRoute] Guid IncidentId)
        {
            var IncidentDocuments = _context.IncidentDocuments.FromSql("SP_GetRaiseticketDocuments @p0",
               IncidentId).ToList();

            return IncidentDocuments;
        }
        [Route("DeleteIncidentDocument/{DocumentId}/{IncidentId}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteIncidentDocument([FromRoute] Guid DocumentId, [FromRoute] Guid IncidentId)
        {
            var Document = await _context.IncidentDocuments.FindAsync(DocumentId);
            if (Document == null)
            {
                return NotFound();
            }

            _context.IncidentDocuments.Remove(Document);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRaiseTicketDocuments", new { id = IncidentId });
        }
    }
}
