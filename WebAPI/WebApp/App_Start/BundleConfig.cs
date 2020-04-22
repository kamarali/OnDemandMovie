using System.Web;
using System.Web.Optimization;

namespace WebApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-3.3.1.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/css/app.min.1.css",
                      "~/Content/css/Chart.css",
                      "~/Content/css/angular-material.css",
                       "~/Content/css/angular-material.layout-attributes.css",
                        "~/Content/css/angular-material.layouts.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/AngularJS").Include(
            "~/Scripts/Chart.js",
            "~/Scripts/angular.js",
            "~/Scripts/angular-animate.js",
            "~/Scripts/angular-aria.js",
            "~/Scripts/angular-messages.js",
            "~/Scripts/angular-route.js",
            "~/Scripts/angular-mocks.js",
            "~/Scripts/angular-local-storage.js",
            "~/Scripts/angular-ui-router.min.js",
            "~/Scripts/angular-chart.js",            
            "~/Scripts/angular-material.js"
            ));

            var scriptBundle = new ScriptBundle("~/bundles/AppJS")
                .IncludeDirectory("~/SPA/", "*.js", searchSubdirectories: true);
            bundles.Add(scriptBundle);
        }
    }
}
