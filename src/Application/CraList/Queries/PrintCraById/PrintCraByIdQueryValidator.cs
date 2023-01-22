using FluentValidation;

namespace Microsoft.Extensions.DependencyInjection.Cras.Queries.GetCraById;

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