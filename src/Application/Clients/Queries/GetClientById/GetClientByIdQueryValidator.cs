using FluentValidation;

namespace ERP.Application.Clients.Queries.GetClientById;

// ReSharper disable once UnusedType.Global
public class GetClientByIdQueryValidator : AbstractValidator<GetClientByIdQuery>
{
    public GetClientByIdQueryValidator()
    {
        RuleFor(q=>q.Id)
            .GreaterThanOrEqualTo(1)
            .WithMessage("The client reference Id cannot be less than 1 (One)");
    }
}
