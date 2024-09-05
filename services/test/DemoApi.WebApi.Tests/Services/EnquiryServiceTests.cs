using AutoMapper;
using DemoApi.Data;
using DemoApi.Mappings;
using DemoApi.Models;
using DemoApi.Services;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace DemoApi.WebApi.Tests.Services
{
    public class EnquiryServiceTests
    {
        private readonly DemoContext _context;
        private readonly IMapper _mapper;
        private readonly EnquiryService _service;

        public EnquiryServiceTests()
        {
            var options = new DbContextOptionsBuilder<DemoContext>()
                .UseInMemoryDatabase(databaseName: "DemoMockDb")
                .Options;
            
            _context = new DemoContext(options);
            _mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile(new EnquiryFormProfile())));
            _service = new EnquiryService(_context, _mapper);
        }

        [Fact]
        public async Task CreateEnquiryAsync_ValidForm_AddsEnquiryToDatabase()
        {
            // Arrange
            var form = new EnquiryForm { Email = "test@example.com" };

            // Act
            await _service.CreateEnquiryAsync(form);

            // Assert
            _context.EnquiryForms.Last().Email.Should().Be("test@example.com");
        }

        [Fact]
        public async Task GetEnquiriesAsync_ValidParameters_ReturnsPagedEnquiries()
        {
            // Arrange
            var page = 1;
            var pageSize = 5;
            _context.EnquiryForms.AddRange(new List<DemoApi.Domain.EnquiryForm> { new(), new(), new(), new(), new(), new() });
            await _context.SaveChangesAsync();

            // Act
            var result = await _service.GetEnquiriesAsync(page, pageSize);

            // Assert
            result.TotalPageCount.Should().Be(2);
            result.Data.Count().Should().Be(1);
        }
    }
}