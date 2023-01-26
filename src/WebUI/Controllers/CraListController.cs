using System.Net.Mime;
using ERP.Application.Clients.Queries.GetClientsWithPagination;
using ERP.Application.Common.Models;
using ERP.Application.Common.Security;
using ERP.Application.CraList.Commands.CreateCra;
using ERP.Application.CraList.Commands.DeleteCra;
using ERP.Application.CraList.Commands.UpdateCra;
using ERP.Application.CraList.Queries.GetCraById;
using ERP.Application.CraList.Queries.PrintCraById;
using ERP.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
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
    
    [HttpGet("Print")]
    public async Task<FileResult> GetCraDetails([FromQuery] PrintCraByIdQuery query)
    {
        var stream = await Mediator.Send(query);
        
        return File(stream, MediaTypeNames.Application.Pdf, "cra.pdf");
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