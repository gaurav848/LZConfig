using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.OData.Builder;
using System.Web.OData.Extensions;
using Lubrizol.LZConfig.Entities;

namespace Lubrizol.LZConfig.Services.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {


            var cors = new EnableCorsAttribute("*", "*", "*");
            cors.SupportsCredentials = true;
            config.EnableCors(cors);
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            ODataModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<tblApplication>("Applications");
            builder.EntitySet<tblApplicationConnection>("ApplicationConnections");
            builder.EntitySet<tblApplicationVariable>("ApplicationVariables");
            config.MapODataServiceRoute(
                routeName:"ODataRoute",
                routePrefix:null,
                model:builder.GetEdmModel()
                );


        }
    }
}
