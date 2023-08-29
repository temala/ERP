using FluentValidation;

namespace ERP.Application.CraList.Commands.CreateCra;

public class CreateCraCommandValidator: AbstractValidator<CreateCraCommand>
{
    public CreateCraCommandValidator()
    {
        RuleFor(v => v.Month)
            .GreaterThan(0)
            .LessThan(13);
        
        RuleFor(v => v.Year)
            .GreaterThan(DateTime.Now.Year-10)
            .LessThan(DateTime.Now.Year+10);
        
        RuleFor(v => v.Days)
            .Must(days=>days.Length<=31);
    }
}