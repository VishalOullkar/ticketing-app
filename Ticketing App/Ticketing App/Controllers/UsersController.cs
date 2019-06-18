using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ticketing_App.Models;

namespace Ticketing_App.Controllers
{
    [Route("api/Users/")]
    [ApiController]
    [EnableCors("EnableCORS")]
    public class UsersController : ControllerBase
    {
        private readonly MITRPLUSARC_TESTContext _context;

        public UsersController(MITRPLUSARC_TESTContext context)
        {
            _context = context;
        }

        [Route("getAutheticateduser/{EmailId}/{password}")]

        public List<Users> getAutheticateduser(string EmailId,string password)
        {

            var userdetails = _context.Users

                    .FromSql("getAuthenticatedUser @p0, @p1",
                     parameters: new[] { EmailId, password })
                     .ToList();

            return userdetails;
        }

        [Route("IsLoggedInUser/{EmailId}/{password}")]
        public Boolean IsLogin(string EmailId, string password)
        {
            var userdetails = _context.Users
              .FromSql("getAuthenticatedUser @p0, @p1",
               parameters: new[] { EmailId, password })
               .ToList();

            if (userdetails.Count > 0)
            {
                return true;
            }
            else
            {
                return false;
            }

        }



        [Route("GetUsers")]
        // GET: api/Users
        [HttpGet]
        public IEnumerable<Users> GetUsers()
        {
         

            var GetUserDetails = _context.Users.Where(columns => columns.IsActive == true).OrderBy(Users => Users.CreatedDate).ToList();
            return GetUserDetails;
        }

        [Route("GetUsers/{id}")]
        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsers([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
  
            var users = await _context.Users.FindAsync(id);
        
            if (users == null)
            {
                return NotFound();
            }

            return Ok(users);
        }



        [Route("PutUsers/{id}")]
        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers([FromRoute] int id, [FromBody] Users users)
        {
           
            if (id != users.Userid)
            {
                return BadRequest();
            }
            _context.Entry(users).State = EntityState.Modified;
            users.IsActive = true;
            _context.Entry(users).Property(x => x.Userid).IsModified = false;
            _context.Entry(users).Property(x => x.Createdby).IsModified = false;
            _context.Entry(users).Property(x => x.CreatedDate).IsModified = false;
         

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
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

        [Route("PostUsers")]
        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> PostUsers([FromBody] Users users)
        {

            var count = _context.Users.Count();
           
       
        Users obj = new Users();
            obj.Userid = count + 1;
            obj.Username = users.Username;
            obj.EmailId = users.EmailId;
            obj.MobileNo = users.MobileNo;
            obj.Password = users.Password;
            obj.CreatedDate = DateTime.Today;
            obj.Createdby = users.Createdby;
            obj.IsActive = true;
            _context.Users.Add(obj);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsers", new { id = users.Userid }, users);
        }

   
        [Route("UpdateUserDetils/{id}")]
        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserDetils([FromRoute] int id,[FromBody] Users objUsers)
        {

         
            _context.Database
            .ExecuteSqlCommand("SP_UpdateUserDetails @p0,@p1",
           id, objUsers.ModifiedBy ,"MITRPLUSARC_TEST");

            return Ok();
        }
        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.Userid == id);
        }
    }
}