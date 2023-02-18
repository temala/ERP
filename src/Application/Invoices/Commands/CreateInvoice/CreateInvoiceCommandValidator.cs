using ERP.Application.Clients.Commands.CreateClient;
using FluentValidation;

namespace Microsoft.Extensions.DependencyInjection.Invoices.Commands.CreateInvoice;

public class CreateInvoiceCommandValidator: AbstractValidator<CreateInvoiceCommand>
{
    public CreateInvoiceCommandValidator()
    {
        RuleFor(v => v.invoiceId)
            .MaximumLength(200)
            .NotEmpty();
        
        RuleFor(v => v.DueDate)
            .GreaterThan(0)
            .NotEmpty();
    }
}