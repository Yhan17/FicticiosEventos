﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Data;
using TodoApp.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ScheduleTypesController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public ScheduleTypesController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/ScheduleTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ScheduleType>>> GetScheduleType()
        {
            return await _context.ScheduleType.ToListAsync();
        }

        // GET: api/ScheduleTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ScheduleType>> GetScheduleType(int id)
        {
            var scheduleType = await _context.ScheduleType.FindAsync(id);

            if (scheduleType == null)
            {
                return NotFound();
            }

            return scheduleType;
        }

        // PUT: api/ScheduleTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutScheduleType(int id, ScheduleType scheduleType)
        {
            if (id != scheduleType.Id)
            {
                return BadRequest();
            }

            _context.Entry(scheduleType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScheduleTypeExists(id))
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

        // POST: api/ScheduleTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ScheduleType>> PostScheduleType(ScheduleType scheduleType)
        {
            _context.ScheduleType.Add(scheduleType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetScheduleType", new { id = scheduleType.Id }, scheduleType);
        }

        // DELETE: api/ScheduleTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScheduleType(int id)
        {
            var scheduleType = await _context.ScheduleType.FindAsync(id);
            if (scheduleType == null)
            {
                return NotFound();
            }

            _context.ScheduleType.Remove(scheduleType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ScheduleTypeExists(int id)
        {
            return _context.ScheduleType.Any(e => e.Id == id);
        }
    }
}
