using ERP.Application.Clients.Queries.GetClientsWithPagination;
using ERP.Application.Common.Models;
using ERP.Application.Common.Security;
using ERP.Application.Cras.Commands.DeleteCra;
using ERP.Application.Cras.Commands.UpdateCra;
using ERP.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection.Cras.Commands.CreateCra;
using Microsoft.Extensions.DependencyInjection.Cras.Queries.GetCraById;
using Microsoft.Extensions.DependencyInjection.Cras.Queries.GetCrasWithPagination;

namespace ERP.WebUI.Controllers;

[Authorize]
public class CraListController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PaginatedList<CraListItemDto>>> GetCraListWithPagination([FromQuery] GetCrasWithPaginationQuery query)
    {
        return await Mediator.Send(query);
    }
    
    [HttpGet("GetCraDetails")]
    public async Task<ActionResult<Cra>> GetCraDetails([FromQuery] GetCraByIdQuery query)
    {
        return await Mediator.Send(query);
    }

    [HttpPost]
    public async Task<ActionResult<CraListItemDto>> Create(CreateCraCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpPut]
    public async Task<ActionResult<Cra>> Update([FromQuery] int id, UpdateCraCommand command)
    {
        if (id != command.Id)
        {
            return BadRequest();
        }

        return await Mediator.Send(command);
    }
    

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await Mediator.Send(new DeleteCraCommand(id));

        return NoContent();
    }
}