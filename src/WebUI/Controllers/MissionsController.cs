using ERP.Application.Clients.Queries.GetClientsWithPagination;
using ERP.Application.Common.Models;
using ERP.Application.Common.Security;
using ERP.Application.Missions.Commands.DeleteMission;
using ERP.Application.Missions.Commands.UpdateMission;
using ERP.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection.Missions.Commands.CreateMission;
using Microsoft.Extensions.DependencyInjection.Missions.Queries.GetMissionById;
using Microsoft.Extensions.DependencyInjection.Missions.Queries.GetMissionsWithPagination;

namespace ERP.WebUI.Controllers;

[Authorize]
public class MissionsController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PaginatedList<MissionListItemDto>>> GetMissionsWithPagination([FromQuery] GetMissionsWithPaginationQuery query)
    {
        return await Mediator.Send(query);
    }
    
    [HttpGet("GetMissionDetails")]
    public async Task<ActionResult<Mission>> GetMissionDetails([FromQuery] GetMissionByIdQuery query)
    {
        return await Mediator.Send(query);
    }

    [HttpPost]
    public async Task<ActionResult<MissionListItemDto>> Create(CreateMissionCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpPut]
    public async Task<ActionResult<Mission>> Update([FromQuery] int id, UpdateMissionCommand command)
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
        await Mediator.Send(new DeleteMissionCommand(id));

        return NoContent();
    }
}