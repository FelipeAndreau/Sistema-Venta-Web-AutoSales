using System.ComponentModel.DataAnnotations;

namespace BackendAPI.Models
{
    public class Car
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Make { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Model { get; set; }
        
        [Required]
        public int Year { get; set; }
        
        [Required]
        [Range(0, 1000000)]
        public decimal Price { get; set; }
        
        public string Description { get; set; }
        
        public string ImageUrl { get; set; }
        
        public bool IsAvailable { get; set; } = true;
    }
}