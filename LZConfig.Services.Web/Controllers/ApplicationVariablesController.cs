﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.ModelBinding;
using System.Web.OData;
using System.Web.OData.Query;
using System.Web.OData.Routing;
using Lubrizol.LZConfig.Data;
using Lubrizol.LZConfig.Entities;

namespace Lubrizol.LZConfig.Services.Web.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.OData.Builder;
    using System.Web.OData.Extensions;
    using Lubrizol.LZConfig.Entities;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<tblApplicationVariable>("ApplicationVariables");
    builder.EntitySet<tblApplication>("tblApplication"); 
    config.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class ApplicationVariablesController : ODataController
    {
        private LZConfigContext db = new LZConfigContext();

        // GET: odata/ApplicationVariables
        [EnableQuery]
        public IQueryable<tblApplicationVariable> GetApplicationVariables()
        {
            return db.tblApplicationVariable;
        }

        // GET: odata/ApplicationVariables(5)
        [EnableQuery]
        public SingleResult<tblApplicationVariable> GettblApplicationVariable([FromODataUri] Guid key)
        {
            return SingleResult.Create(db.tblApplicationVariable.Where(tblApplicationVariable => tblApplicationVariable.ApplicationID == key));
        }

        // PUT: odata/ApplicationVariables(5)
        public IHttpActionResult Put([FromODataUri] Guid key, Delta<tblApplicationVariable> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            tblApplicationVariable tblApplicationVariable = db.tblApplicationVariable.Find(key);
            if (tblApplicationVariable == null)
            {
                return NotFound();
            }

            patch.Put(tblApplicationVariable);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblApplicationVariableExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(tblApplicationVariable);
        }

        // POST: odata/ApplicationVariables
        public IHttpActionResult Post(tblApplicationVariable tblApplicationVariable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tblApplicationVariable.Add(tblApplicationVariable);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (tblApplicationVariableExists(tblApplicationVariable.ApplicationID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(tblApplicationVariable);
        }

        // PATCH: odata/ApplicationVariables(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] Guid key, Delta<tblApplicationVariable> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            tblApplicationVariable tblApplicationVariable = db.tblApplicationVariable.Find(key);
            if (tblApplicationVariable == null)
            {
                return NotFound();
            }

            patch.Patch(tblApplicationVariable);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblApplicationVariableExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(tblApplicationVariable);
        }

        // DELETE: odata/ApplicationVariables(5)
        public IHttpActionResult Delete([FromODataUri] Guid key)
        {
            tblApplicationVariable tblApplicationVariable = db.tblApplicationVariable.Find(key);
            if (tblApplicationVariable == null)
            {
                return NotFound();
            }

            db.tblApplicationVariable.Remove(tblApplicationVariable);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/ApplicationVariables(5)/tblApplication
        [EnableQuery]
        public SingleResult<tblApplication> GettblApplication([FromODataUri] Guid key)
        {
            return SingleResult.Create(db.tblApplicationVariable.Where(m => m.ApplicationID == key).Select(m => m.tblApplication));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblApplicationVariableExists(Guid key)
        {
            return db.tblApplicationVariable.Count(e => e.ApplicationID == key) > 0;
        }
    }
}
