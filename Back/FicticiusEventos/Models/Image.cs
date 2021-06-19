using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models
{
    public class Image
    {
        public int Id { get; set; }
        public String Link { get; set; }
        public int? CustomerId { get; set; }
        public virtual Customer Customer {get;set;}
    }
}
