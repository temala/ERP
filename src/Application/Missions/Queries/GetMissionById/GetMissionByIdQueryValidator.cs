using FluentValidation;

namespace ERP.Application.Missions.Queries.GetMissionById;

// ReSharper disable once UnusedType.Global
public class GetMissionByIdQueryValidator : AbstractValidator<GetMissionByIdQuery>
{
    public GetMissionByIdQueryValidator()
    {
        RuleFor(q=>q.Id)
            .GreaterThanOrEqualTo(1)
            .WithMessage("The mission reference Id cannot be less than 1 (One)");
    }
}
