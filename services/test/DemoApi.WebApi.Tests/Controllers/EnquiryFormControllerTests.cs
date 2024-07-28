using DemoApi.Controllers;
using DemoApi.Models;
using DemoApi.Services;
using FluentAssertions;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace DemoApi.WebApi.Tests.Controllers
{
    public class EnquiryFormControllerTests
    {
        private readonly Mock<IEnquiryService> _enquiryServiceMock;
        private readonly Mock<IValidator<EnquiryForm>> _validatorMock;
        private readonly EnquiryFormController _controller;

        public EnquiryFormControllerTests()
        {
            _enquiryServiceMock = new Mock<IEnquiryService>();
            _validatorMock = new Mock<IValidator<EnquiryForm>>();
            _controller = new EnquiryFormController(_enquiryServiceMock.Object, _validatorMock.Object);
        }

        [Fact]
        public async Task Post_ValidForm_ReturnsCreatedResult()
        {
            // Arrange
            var form = new EnquiryForm { Email = "test@example.com" };
            _validatorMock.Setup(v => v.ValidateAsync(form, It.IsAny<CancellationToken>()))
                .ReturnsAsync(new ValidationResult());

            // Act
            var result = await _controller.Post(form);

            // Assert
            result.Should().BeOfType<CreatedResult>();
        }

        [Fact]
        public async Task Post_InvalidForm_ReturnsBadRequestResult()
        {
            // Arrange
            var form = new EnquiryForm { Email = "" };
            _validatorMock.Setup(v => v.ValidateAsync(form, It.IsAny<CancellationToken>()))
                .ReturnsAsync(new ValidationResult
                    { Errors = { new ValidationFailure("Email", "Email is required") } });

            // Act
            var result = await _controller.Post(form);

            // Assert
            result.Should().BeOfType<BadRequestObjectResult>();
        }

        [Fact]
        public async Task Get_ValidParameters_ReturnsOkResult()
        {
            // Arrange
            var page = 0;
            var pageSize = 10;
            _enquiryServiceMock.Setup(s => s.GetEnquiriesAsync(page, pageSize)).ReturnsAsync(new TableModel<EnquiryForm>
                { Data = new[] { new EnquiryForm() } });

            // Act
            var result = await _controller.Get(page, pageSize);

            // Assert
            result.Result.Should().BeOfType<OkObjectResult>();
        }

        // Add more tests for edge cases and other scenarios
    }
}