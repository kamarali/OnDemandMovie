namespace WebAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FourthCreate : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.WatchHistories", newName: "tblWatchHistory");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.tblWatchHistory", newName: "WatchHistories");
        }
    }
}
