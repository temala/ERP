using ERP.Application.Clients.Commands.CreateClient;
using FluentValidation;

namespace Microsoft.Extensions.DependencyInjection.Cras.Commands.CreateCra;

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
    }
}