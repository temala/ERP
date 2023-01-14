using ERP.Application.Clients.Commands.CreateClient;
using FluentValidation;

namespace Microsoft.Extensions.DependencyInjection.Missions.Commands.CreateMission;

public class CreateMissionCommandValidator: AbstractValidator<CreateMissionCommand>
{
    public CreateMissionCommandValidator()
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