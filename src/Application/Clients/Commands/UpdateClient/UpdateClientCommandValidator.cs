using FluentValidation;

namespace ERP.Application.Clients.Commands.UpdateClient;

public class UpdateClientCommandValidator : AbstractValidator<UpdateClientCommand>
{
    public UpdateClientCommandValidator()
    {
        RuleFor(v => v.Id)
            .GreaterThan(0);

        RuleFor(v => v.Name)
            .MaximumLength(200)
            .NotEmpty();

        RuleFor(v => v.Email)
            .MaximumLength(256)
            .EmailAddress()
            .When(v => !string.IsNullOrEmpty(v.Email));

        RuleFor(v => v.ContactName)
            .MaximumLength(200);

        RuleFor(v => v.Telephone)
            .MaximumLength(30);

        RuleFor(v => v.CompanyName)
            .MaximumLength(200);

        RuleFor(v => v.Siret)
            .MaximumLength(14);

        RuleFor(v => v.Tva)
            .MaximumLength(20);

        RuleFor(v => v.Address)
            .MaximumLength(500);

        RuleFor(v => v.PostalCode)
            .MaximumLength(10);

        RuleFor(v => v.Town)
            .MaximumLength(100);

        RuleFor(v => v.Country)
            .MaximumLength(100);
    }
}
