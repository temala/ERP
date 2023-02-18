using FluentValidation;

namespace Microsoft.Extensions.DependencyInjection.Invoices.Queries.GetInvoiceById;

// ReSharper disable once UnusedType.Global
public class GetInvoiceByIdQueryValidator : AbstractValidator<GetInvoiceByIdQuery>
{
    public GetInvoiceByIdQueryValidator()
    {
        RuleFor(q=>q.Id)
            .GreaterThanOrEqualTo(1)
            .WithMessage("The client reference Id cannot be less than 1 (One)");
    }
}