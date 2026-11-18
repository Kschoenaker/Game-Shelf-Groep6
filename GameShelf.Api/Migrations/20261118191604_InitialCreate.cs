using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameShelf.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GAME",
                columns: table => new
                {
                    game_id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    title = table.Column<string>(type: "TEXT", nullable: false),
                    publisher = table.Column<string>(type: "TEXT", nullable: false),
                    release_year = table.Column<int>(type: "INTEGER", nullable: false),
                    edition = table.Column<string>(type: "TEXT", nullable: false),
                    category = table.Column<string>(type: "TEXT", nullable: false),
                    min_players = table.Column<int>(type: "INTEGER", nullable: false),
                    max_players = table.Column<int>(type: "INTEGER", nullable: false),
                    playing_time_minutes = table.Column<int>(type: "INTEGER", nullable: false),
                    box_image_url = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GAME", x => x.game_id);
                });

            migrationBuilder.CreateTable(
                name: "MEMBER",
                columns: table => new
                {
                    member_id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    name = table.Column<string>(type: "TEXT", nullable: false),
                    email = table.Column<string>(type: "TEXT", nullable: false),
                    password_hash = table.Column<string>(type: "TEXT", nullable: false),
                    is_committee = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MEMBER", x => x.member_id);
                });

            migrationBuilder.CreateTable(
                name: "WISHLIST_ITEM",
                columns: table => new
                {
                    wishlist_item_id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    member_id = table.Column<int>(type: "INTEGER", nullable: false),
                    game_id = table.Column<int>(type: "INTEGER", nullable: false),
                    priority = table.Column<int>(type: "INTEGER", nullable: false),
                    note = table.Column<string>(type: "TEXT", nullable: false),
                    is_fulfilled = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WISHLIST_ITEM", x => x.wishlist_item_id);
                    table.ForeignKey(
                        name: "FK_WISHLIST_ITEM_GAME_game_id",
                        column: x => x.game_id,
                        principalTable: "GAME",
                        principalColumn: "game_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WISHLIST_ITEM_MEMBER_member_id",
                        column: x => x.member_id,
                        principalTable: "MEMBER",
                        principalColumn: "member_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TRADE_OFFER",
                columns: table => new
                {
                    offer_id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    wishlist_item_id = table.Column<int>(type: "INTEGER", nullable: false),
                    proposer_id = table.Column<int>(type: "INTEGER", nullable: false),
                    requested_game_id = table.Column<int>(type: "INTEGER", nullable: false),
                    made_at = table.Column<DateTimeOffset>(type: "TEXT", nullable: false),
                    status = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TRADE_OFFER", x => x.offer_id);
                    table.ForeignKey(
                        name: "FK_TRADE_OFFER_GAME_requested_game_id",
                        column: x => x.requested_game_id,
                        principalTable: "GAME",
                        principalColumn: "game_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TRADE_OFFER_MEMBER_proposer_id",
                        column: x => x.proposer_id,
                        principalTable: "MEMBER",
                        principalColumn: "member_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TRADE_OFFER_WISHLIST_ITEM_wishlist_item_id",
                        column: x => x.wishlist_item_id,
                        principalTable: "WISHLIST_ITEM",
                        principalColumn: "wishlist_item_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TRADE_OFFER_proposer_id",
                table: "TRADE_OFFER",
                column: "proposer_id");

            migrationBuilder.CreateIndex(
                name: "IX_TRADE_OFFER_requested_game_id",
                table: "TRADE_OFFER",
                column: "requested_game_id");

            migrationBuilder.CreateIndex(
                name: "IX_TRADE_OFFER_wishlist_item_id",
                table: "TRADE_OFFER",
                column: "wishlist_item_id");

            migrationBuilder.CreateIndex(
                name: "IX_WISHLIST_ITEM_game_id",
                table: "WISHLIST_ITEM",
                column: "game_id");

            migrationBuilder.CreateIndex(
                name: "IX_WISHLIST_ITEM_member_id",
                table: "WISHLIST_ITEM",
                column: "member_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TRADE_OFFER");

            migrationBuilder.DropTable(
                name: "WISHLIST_ITEM");

            migrationBuilder.DropTable(
                name: "GAME");

            migrationBuilder.DropTable(
                name: "MEMBER");
        }
    }
}
