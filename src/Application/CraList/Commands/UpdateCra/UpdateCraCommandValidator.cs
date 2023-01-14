using ERP.Application.Cras.Commands.UpdateCra;
using FluentValidation;

namespace ERP.Application.Clients.Commands.UpdateClient;

public class UpdateCraCommandValidator : AbstractValidator<UpdateCraCommand>
{
    public UpdateCraCommandValidator()
    {
        RuleFor(v => v.Month)
            .GreaterThan(0)
            .LessThan(13);
        
        RuleFor(v => v.Year)
            .GreaterThan(DateTime.Now.Year-10)
            .LessThan(DateTime.Now.Year+10);
    }
}
