using ERP.Application.Common.Models;
using ERP.Application.Common.Security;
using ERP.Application.Invoices.Commands.DeleteInvoice;
using ERP.Application.Invoices.Commands.UpdateInvoice;
using ERP.Application.Invoices.Queries.GetInvoicesWithPagination;
using ERP.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection.Invoices.Commands.CreateInvoice;
using Microsoft.Extensions.DependencyInjection.Invoices.Queries.GetInvoiceById;

namespace ERP.WebUI.Controllers;

[Authorize]
public class InvoicesController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PaginatedList<InvoiceListItemDto>>> GetInvoicesWithPagination([FromQuery] GetInvoicesWithPaginationQuery query)
    {
        return await Mediator.Send(query);
    }
    
    [HttpGet("GetInvoiceDetails")]
    public async Task<ActionResult<Invoice>> GetInvoiceDetails([FromQuery] GetInvoiceByIdQuery query)
    {
        return await Mediator.Send(query);
    }

    [HttpPost]
    public async Task<ActionResult<InvoiceListItemDto>> Create(CreateInvoiceCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpPut]
    public async Task<ActionResult<InvoiceListItemDto>> Update([FromQuery] int id, UpdateInvoiceCommand command)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.SelectMany(x => x.Value.Errors.Select(p => p.ErrorMessage)).ToList();
            return BadRequest(errors);
        }
        if (id != command.Id )
        {
            return BadRequest();
        }

        return await Mediator.Send(command);
    }
    

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await Mediator.Send(new DeleteInvoiceCommand(id));

        return NoContent();
    }
}