using FluentValidation;

namespace ERP.Application.CraList.Queries.GetCraListWithPagination;

// ReSharper disable once UnusedType.Global
public class GetCraListWithPaginationQueryValidator : AbstractValidator<GetCraListWithPaginationQuery>
{
    public GetCraListWithPaginationQueryValidator()
    {
        RuleFor(x => x.PageNumber)
            .GreaterThanOrEqualTo(1).WithMessage("PageNumber at least greater than or equal to 1.");

        RuleFor(x => x.PageSize)
            .GreaterThanOrEqualTo(1).WithMessage("PageSize at least greater than or equal to 1.");
    }
}
