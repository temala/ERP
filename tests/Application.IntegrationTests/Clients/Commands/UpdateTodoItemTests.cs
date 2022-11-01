using ERP.Application.Common.Exceptions;
using ERP.Application.Clients.Commands.CreateClient;
using ERP.Application.Clients.Commands.UpdateClient;
using ERP.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;

namespace ERP.Application.IntegrationTests.Clients.Commands;

using static Testing;

public class UpdateClientTests : BaseTestFixture
{
    [Test]
    public async Task ShouldRequireValidClientId()
    {
        var command = new UpdateClientCommand { Id = 99, Title = "New Title" };
        await FluentActions.Invoking(() => SendAsync(command)).Should().ThrowAsync<NotFoundException>();
    }

    [Test]
    public async Task ShouldUpdateClient()
    {
        var userId = await RunAsDefaultUserAsync();

        var createdItem = await SendAsync(new CreateClientCommand
        {
            Title = "New Item"
        });

        var command = new UpdateClientCommand
        {
            Id = createdItem.Id,
            Title = "Updated Item Title"
        };

        await SendAsync(command);

        var item = await FindAsync<Client>(createdItem);

        item.Should().NotBeNull();
        item!.Title.Should().Be(command.Title);
        item.LastModifiedBy.Should().NotBeNull();
        item.LastModifiedBy.Should().Be(userId);
        item.LastModified.Should().NotBeNull();
        item.LastModified.Should().BeCloseTo(DateTime.Now, TimeSpan.FromMilliseconds(10000));
    }
}
