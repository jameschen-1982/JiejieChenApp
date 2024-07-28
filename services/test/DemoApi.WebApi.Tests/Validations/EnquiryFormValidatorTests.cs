using DemoApi.Models;
using DemoApi.Validations;
using FluentAssertions;
using FluentValidation.TestHelper;

namespace DemoApi.WebApi.Tests.Validations
{
    public class EnquiryFormValidatorTests
    {
        private readonly EnquiryFormValidator _validator;

        public EnquiryFormValidatorTests()
        {
            _validator = new EnquiryFormValidator();
        }

        [Fact]
        public void ValidateEmail_ValidEmail_ShouldNotHaveValidationError()
        {
            // Arrange
            var form = new EnquiryForm { Email = "test@example.com" };

            // Act
            var result = _validator.Validate(form);

            // Assert
            result.IsValid.Should().BeTrue();
        }

        [Fact]
        public void ValidateEmail_InvalidEmail_ShouldHaveValidationError()
        {
            // Arrange
            var form = new EnquiryForm { Email = "invalid" };

            // Act
            var result = _validator.TestValidate(form);

            // Assert
            result.ShouldHaveValidationErrorFor(f => f.Email);
        }
    }
}