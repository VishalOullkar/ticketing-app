using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ticketing_App.Models;

namespace Ticketing_App.Controllers
{
    [Route("api/IncidentConversations/")]
    [ApiController]
    [EnableCors("EnableCORS")]
    public class IncidentConversationsController : ControllerBase
    {
        private readonly MITRPLUSARC_TESTContext _context;

        public IncidentConversationsController(MITRPLUSARC_TESTContext context)
        {
            _context = context;
        }

        // GET: api/IncidentConversations
        [HttpGet]
        public IEnumerable<IncidentConversation> GetIncidentConversation()
        {
            return _context.IncidentConversation;
        }

        // GET: api/IncidentConversations/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetIncidentConversation([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var incidentConversation = await _context.IncidentConversation.FindAsync(id);

            if (incidentConversation == null)
            {
                return NotFound();
            }

            return Ok(incidentConversation);
        }

        [Route("GetConversationListById/{Id}")]
        [HttpGet]
        public IEnumerable<IncidentConversation> GetConversationListById(string Id)
        {
            var conversationList = _context.IncidentConversation
                .FromSql("spgetConversationList @p0", Id).ToList();

            return conversationList.OrderBy(sl => sl.IncidentId); ;
        }


        // PUT: api/IncidentConversations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIncidentConversation([FromRoute] int id, [FromBody] IncidentConversation incidentConversation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != incidentConversation.Id)
            {
                return BadRequest();
            }

            _context.Entry(incidentConversation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IncidentConversationExists(id))
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

        // POST: api/IncidentConversations
        [HttpPost]
        public async Task<IActionResult> PostIncidentConversation([FromBody] IncidentConversation incidentConversation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.IncidentConversation.Add(incidentConversation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIncidentConversation", new { id = incidentConversation.Id }, incidentConversation);
        }


        [Route("PostIncidentConversation")]
        [HttpPost]
        public async Task<IActionResult> postIncidentConversation([FromBody] IncidentConversation convObj)
        {

            // Guid id = convObj.Id;
            _context.Database
            .ExecuteSqlCommand("sp_InsertUpdateIncidentConvarsion @p0,@p1,@p2,@p3,@p4,@p5",
            convObj.Status,convObj.commentedBy,convObj.comment,convObj.comment, "MITRPLUSARC_TEST", convObj.IncidentId);

            return CreatedAtAction("GetIncidentConversation", new { id = convObj.Id }, convObj);
        }

        // DELETE: api/IncidentConversations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncidentConversation([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var incidentConversation = await _context.IncidentConversation.FindAsync(id);
            if (incidentConversation == null)
            {
                return NotFound();
            }

            _context.IncidentConversation.Remove(incidentConversation);
            await _context.SaveChangesAsync();

            return Ok(incidentConversation);
        }

        private bool IncidentConversationExists(int id)
        {
            return _context.IncidentConversation.Any(e => e.Id == id);
        }
    }
}