﻿using FluentValidation;

namespace ERP.Application.Clients.Queries.GetClientsWithPagination;

// ReSharper disable once UnusedType.Global
public class GetMissionsWithPaginationQueryValidator : AbstractValidator<GetMissionsWithPaginationQuery>
{
    public GetMissionsWithPaginationQueryValidator()
    {
        RuleFor(x => x.PageNumber)
            .GreaterThanOrEqualTo(1).WithMessage("PageNumber at least greater than or equal to 1.");

        RuleFor(x => x.PageSize)
            .GreaterThanOrEqualTo(1).WithMessage("PageSize at least greater than or equal to 1.");
    }
}
