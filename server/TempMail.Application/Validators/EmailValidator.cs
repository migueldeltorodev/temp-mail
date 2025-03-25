using FluentValidation;
using TempMail.Application.Domain;
using TempMail.Application.Repositories;

namespace TempMail.Application.Validators;

public class EmailValidator : AbstractValidator<Email>
{
    private readonly IEmailRepository _emailRepository;

    public EmailValidator(IEmailRepository emailRepository)
    {
        _emailRepository = emailRepository;
        RuleFor(m => m.Id)
            .NotEmpty().WithMessage("Id required");
        RuleFor(m => m.From)
            .NotEmpty().WithMessage("The address from the sender it's required");
        RuleFor(m => m.Subject)
            .NotEmpty().WithMessage("Subject required");
        RuleFor(m => m.Body)
            .NotEmpty().WithMessage("Body required");
    }
    
}