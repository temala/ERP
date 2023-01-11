using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERP.Infrastructure.Migrations.ApplicationDbContext2Migrations
{
    /// <inheritdoc />
    public partial class missionClient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "Missions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Missions_ClientId",
                table: "Missions",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Missions_Clients_ClientId",
                table: "Missions",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Missions_Clients_ClientId",
                table: "Missions");

            migrationBuilder.DropIndex(
                name: "IX_Missions_ClientId",
                table: "Missions");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Missions");
        }
    }
}
