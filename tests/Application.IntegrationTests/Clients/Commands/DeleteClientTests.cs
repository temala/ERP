using ERP.Application.Common.Exceptions;
using ERP.Application.Clients.Commands.CreateClient;
using ERP.Application.Clients.Commands.DeleteClient;
using ERP.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;

namespace ERP.Application.IntegrationTests.Clients.Commands;

using static Testing;

public class DeleteClientTests : BaseTestFixture
{
    [Test]
    public async Task ShouldRequireValidClientId()
    {
        var command = new DeleteClientCommand(99);

        await FluentActions.Invoking(() =>
            SendAsync(command)).Should().ThrowAsync<NotFoundException>();
    }

    [Test]
    public async Task ShouldDeleteClient()
    {
        var createdItem = await SendAsync(new CreateClientCommand
        {
            Name = "New Item"
        });

        await SendAsync(new DeleteClientCommand(createdItem.Id));

        var item = await FindAsync<Client>(createdItem);

        item.Should().BeNull();
    }
}
