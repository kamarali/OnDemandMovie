namespace WebAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FifthCreate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblWatchHistory", "UserId", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblWatchHistory", "UserId");
        }
    }
}
