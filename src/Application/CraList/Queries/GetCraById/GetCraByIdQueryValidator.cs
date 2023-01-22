using FluentValidation;

namespace ERP.Application.CraList.Queries.GetCraById;

// ReSharper disable once UnusedType.Global
public class GetCraByIdQueryValidator : AbstractValidator<GetCraByIdQuery>
{
    public GetCraByIdQueryValidator()
    {
        RuleFor(q=>q.Id)
            .GreaterThanOrEqualTo(1)
            .WithMessage("The client reference Id cannot be less than 1 (One)");
    }
}