using FluentValidation;

namespace ERP.Application.Missions.Commands.UpdateMission;

public class UpdateMissionCommandValidator : AbstractValidator<UpdateMissionCommand>
{
    public UpdateMissionCommandValidator()
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
