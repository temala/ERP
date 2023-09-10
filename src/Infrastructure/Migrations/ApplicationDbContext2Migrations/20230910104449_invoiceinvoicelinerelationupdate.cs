using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERP.Infrastructure.Migrations.ApplicationDbContext2Migrations
{
    /// <inheritdoc />
    public partial class invoiceinvoicelinerelationupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InvoiceLinesMap");

            migrationBuilder.AddColumn<int>(
                name: "InvoiceId",
                table: "InvoiceLines",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceLines_InvoiceId",
                table: "InvoiceLines",
                column: "InvoiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceLines_Invoices_InvoiceId",
                table: "InvoiceLines",
                column: "InvoiceId",
                principalTable: "Invoices",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceLines_Invoices_InvoiceId",
                table: "InvoiceLines");

            migrationBuilder.DropIndex(
                name: "IX_InvoiceLines_InvoiceId",
                table: "InvoiceLines");

            migrationBuilder.DropColumn(
                name: "InvoiceId",
                table: "InvoiceLines");

            migrationBuilder.CreateTable(
                name: "InvoiceLinesMap",
                columns: table => new
                {
                    InvoiceLinesId = table.Column<int>(type: "int", nullable: false),
                    InvoicesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvoiceLinesMap", x => new { x.InvoiceLinesId, x.InvoicesId });
                    table.ForeignKey(
                        name: "FK_InvoiceLinesMap_InvoiceLines_InvoiceLinesId",
                        column: x => x.InvoiceLinesId,
                        principalTable: "InvoiceLines",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_InvoiceLinesMap_Invoices_InvoicesId",
                        column: x => x.InvoicesId,
                        principalTable: "Invoices",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceLinesMap_InvoicesId",
                table: "InvoiceLinesMap",
                column: "InvoicesId");
        }
    }
}
