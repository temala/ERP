using ERP.Application.Missions.Commands.UpdateMission;
using FluentValidation;

namespace ERP.Application.Clients.Commands.UpdateClient;

public class UpdateClientCommandValidator : AbstractValidator<UpdateMissionCommand>
{
    public UpdateClientCommandValidator()
    {
        RuleFor(v => v.Name)
            .MaximumLength(200)
            .NotEmpty();
    }
}
