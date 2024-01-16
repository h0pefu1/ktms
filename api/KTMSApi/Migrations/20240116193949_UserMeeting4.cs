using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KTMSApi.Migrations
{
    /// <inheritdoc />
    public partial class UserMeeting4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserMeeting_Meetings_MeetingId",
                table: "UserMeeting");

            migrationBuilder.DropForeignKey(
                name: "FK_UserMeeting_Users_UserId",
                table: "UserMeeting");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserMeeting",
                table: "UserMeeting");

            migrationBuilder.RenameTable(
                name: "UserMeeting",
                newName: "UserMeetings");

            migrationBuilder.RenameIndex(
                name: "IX_UserMeeting_UserId",
                table: "UserMeetings",
                newName: "IX_UserMeetings_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserMeeting_MeetingId",
                table: "UserMeetings",
                newName: "IX_UserMeetings_MeetingId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserMeetings",
                table: "UserMeetings",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserMeetings_Meetings_MeetingId",
                table: "UserMeetings",
                column: "MeetingId",
                principalTable: "Meetings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserMeetings_Users_UserId",
                table: "UserMeetings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserMeetings_Meetings_MeetingId",
                table: "UserMeetings");

            migrationBuilder.DropForeignKey(
                name: "FK_UserMeetings_Users_UserId",
                table: "UserMeetings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserMeetings",
                table: "UserMeetings");

            migrationBuilder.RenameTable(
                name: "UserMeetings",
                newName: "UserMeeting");

            migrationBuilder.RenameIndex(
                name: "IX_UserMeetings_UserId",
                table: "UserMeeting",
                newName: "IX_UserMeeting_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserMeetings_MeetingId",
                table: "UserMeeting",
                newName: "IX_UserMeeting_MeetingId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserMeeting",
                table: "UserMeeting",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserMeeting_Meetings_MeetingId",
                table: "UserMeeting",
                column: "MeetingId",
                principalTable: "Meetings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserMeeting_Users_UserId",
                table: "UserMeeting",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
