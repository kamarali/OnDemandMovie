namespace WebAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ThirdCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.WatchHistories",
                c => new
                    {
                        WatchID = c.Int(nullable: false, identity: true),
                        CategoryID = c.Int(),
                        VideoID = c.Int(),
                        WatchDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.WatchID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.WatchHistories");
        }
    }
}
