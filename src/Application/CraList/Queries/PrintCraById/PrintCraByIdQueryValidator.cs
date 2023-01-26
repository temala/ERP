using FluentValidation;

namespace ERP.Application.CraList.Queries.PrintCraById;

// ReSharper disable once UnusedType.Global
public class PrintCraByIdQueryValidator : AbstractValidator<PrintCraByIdQuery>
{
    public PrintCraByIdQueryValidator()
    {
        RuleFor(q=>q.Id)
            .GreaterThanOrEqualTo(1)
            .WithMessage("The client reference Id cannot be less than 1 (One)");
    }
}