using ERP.Application.Missions.Commands.UpdateMission;
using FluentValidation;

namespace ERP.Application.Clients.Commands.UpdateClient;

public class UpdateMissionCommandValidator : AbstractValidator<UpdateMissionCommand>
{
    public UpdateMissionCommandValidator()
    {
        RuleFor(v => v.Name)
            .MaximumLength(200)
            .NotEmpty();
        
        RuleFor(v => v.PriceHT)
            .GreaterThan(0)
            .NotEmpty();
        
        RuleFor(v => v.Tva)
            .GreaterThan(0)
            .NotEmpty();
    }
}
