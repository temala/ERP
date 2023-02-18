using FluentValidation;

namespace ERP.Application.Invoices.Queries.GetInvoicesWithPagination;

// ReSharper disable once UnusedType.Global
public class GetInvoicesWithPaginationQueryValidator : AbstractValidator<GetInvoicesWithPaginationQuery>
{
    public GetInvoicesWithPaginationQueryValidator()
    {
        RuleFor(x => x.PageNumber)
            .GreaterThanOrEqualTo(1).WithMessage("PageNumber at least greater than or equal to 1.");

        RuleFor(x => x.PageSize)
            .GreaterThanOrEqualTo(1).WithMessage("PageSize at least greater than or equal to 1.");
    }
}
