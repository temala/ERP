using ERP.Application.Common.Exceptions;
using ERP.Application.Clients.Commands.CreateClient;
using ERP.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;

namespace ERP.Application.IntegrationTests.Clients.Commands;

using static Testing;

public class CreateClientTests : BaseTestFixture
{
    [Test]
    public async Task ShouldRequireMinimumFields()
    {
        var command = new CreateClientCommand();

        await FluentActions.Invoking(() =>
            SendAsync(command)).Should().ThrowAsync<ValidationException>();
    }

    [Test]
    public async Task ShouldCreateClient()
    {
        var userId = await RunAsDefaultUserAsync();

        var command = new CreateClientCommand
        {
            Name = "Tasks"
        };

        var itemId = await SendAsync(command);

        var item = await FindAsync<Client>(itemId);

        item.Should().NotBeNull();
#pragma warning disable CS8602
        item.Name.Should().Be(command.Name);
#pragma warning restore CS8602
        item.CreatedBy.Should().Be(userId);
        item.Created.Should().BeCloseTo(DateTime.Now, TimeSpan.FromMilliseconds(10000));
        item.LastModifiedBy.Should().Be(userId);
        item.LastModified.Should().BeCloseTo(DateTime.Now, TimeSpan.FromMilliseconds(10000));
    }
}
