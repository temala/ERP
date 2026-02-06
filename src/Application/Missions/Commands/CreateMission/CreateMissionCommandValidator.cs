using FluentValidation;

namespace ERP.Application.Missions.Commands.CreateMission;

public class CreateMissionCommandValidator: AbstractValidator<CreateMissionCommand>
{
    public CreateMissionCommandValidator()
    {
        RuleFor(v => v.Name)
            .MaximumLength(200)
            .NotEmpty();

        RuleFor(v => v.PriceHT)
            .GreaterThan(0);

        RuleFor(v => v.Tva)
            .GreaterThan(0);
    }
}
