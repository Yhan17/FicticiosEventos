using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models
{
  public class Schedule
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public float Price { get; set; }
    [Column(TypeName = "Date")]
    public DateTime Date { get; set; }
    public TimeSpan Time { get; set; }
    public string Description { get; set; }
    public int ScheduleTypeId { get; set; }
    public int CustomerId { get; set; }
    public int AddressId { get; set; }
    public bool Active { get; set; }
    public virtual ScheduleType ScheduleType { get; set; }
    public virtual Customer Customer { get; set; }
    public virtual Address Address { get; set; }
  }
}
