using ERP.Application.Common.Models;
using ERP.Application.Clients.Commands.CreateClient;
using ERP.Application.Clients.Commands.DeleteClient;
using ERP.Application.Clients.Commands.UpdateClient;
using ERP.Application.Clients.Queries.GetClientsWithPagination;
using ERP.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ERP.Application.Clients.Queries.GetClientById;

namespace ERP.WebUI.Controllers;

[Authorize]
public class ClientsController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PaginatedList<ClientListItemDto>>> GetClientsWithPagination([FromQuery] GetClientsWithPaginationQuery query)
    {
        return await Mediator.Send(query);
    }
    
    [HttpGet("GetClientDetails")]
    public async Task<ActionResult<Client>> GetClientDetails([FromQuery] GetClientByIdQuery query)
    {
        return await Mediator.Send(query);
    }

    [HttpPost]
    public async Task<ActionResult<ClientListItemDto>> Create(CreateClientCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpPut]
    public async Task<ActionResult<Client>> Update([FromQuery] int id, UpdateClientCommand command)
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
        await Mediator.Send(new DeleteClientCommand(id));

        return NoContent();
    }
}
