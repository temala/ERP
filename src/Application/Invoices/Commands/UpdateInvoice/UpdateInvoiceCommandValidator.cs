using ERP.Application.Invoices.Commands.UpdateInvoice;
using FluentValidation;

namespace ERP.Application.Clients.Commands.UpdateClient;

public class UpdateInvoiceCommandValidator : AbstractValidator<UpdateInvoiceCommand>
{
    public UpdateInvoiceCommandValidator()
    {
        RuleFor(v => v.Identifier)
            .MaximumLength(200)
            .NotEmpty();
        
        RuleFor(v => v.DueDate)
            .GreaterThan(0)
            .NotEmpty();
    }
}
