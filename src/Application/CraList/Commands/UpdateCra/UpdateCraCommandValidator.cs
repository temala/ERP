using FluentValidation;

namespace ERP.Application.CraList.Commands.UpdateCra;

public class UpdateCraCommandValidator : AbstractValidator<UpdateCraCommand>
{
    public UpdateCraCommandValidator()
    {
        RuleFor(v => v.Month)
            .GreaterThan(0)
            .LessThan(13);

        RuleFor(v => v.Year)
            .GreaterThan(DateTime.Now.Year - 10)
            .LessThan(DateTime.Now.Year + 10);

        RuleFor(v => v.MissionId)
            .GreaterThan(0)
            .WithMessage("A mission must be selected.");
    }
}
