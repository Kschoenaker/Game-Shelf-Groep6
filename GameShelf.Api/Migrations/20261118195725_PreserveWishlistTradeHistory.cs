using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameShelf.Api.Migrations
{
    /// <inheritdoc />
    public partial class PreserveWishlistTradeHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TRADE_OFFER_WISHLIST_ITEM_wishlist_item_id",
                table: "TRADE_OFFER");

            migrationBuilder.AddForeignKey(
                name: "FK_TRADE_OFFER_WISHLIST_ITEM_wishlist_item_id",
                table: "TRADE_OFFER",
                column: "wishlist_item_id",
                principalTable: "WISHLIST_ITEM",
                principalColumn: "wishlist_item_id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TRADE_OFFER_WISHLIST_ITEM_wishlist_item_id",
                table: "TRADE_OFFER");

            migrationBuilder.AddForeignKey(
                name: "FK_TRADE_OFFER_WISHLIST_ITEM_wishlist_item_id",
                table: "TRADE_OFFER",
                column: "wishlist_item_id",
                principalTable: "WISHLIST_ITEM",
                principalColumn: "wishlist_item_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
