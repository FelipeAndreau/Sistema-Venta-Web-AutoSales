namespace BackendAPI.Models
{
    public class Sale
    {
        public int Id { get; set; }
        public int CarId { get; set; }
        public Car Car { get; set; } = null!;
        public int CustomerId { get; set; }
        public Customer Customer { get; set; } = null!;
        public DateTime SaleDate { get; set; }
        public decimal Price { get; set; }
    }
}