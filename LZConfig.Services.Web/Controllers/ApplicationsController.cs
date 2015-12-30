using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Diagnostics;
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
    builder.EntitySet<tblApplication>("Applications");
    builder.EntitySet<tblApplicationConnection>("tblApplicationConnection"); 
    builder.EntitySet<tblApplicationVariable>("tblApplicationVariable"); 
    config.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class ApplicationsController : ODataController
    {
        private LZConfigContext db = new LZConfigContext();

        // GET: odata/Applications
        [EnableQuery]
        public IQueryable<tblApplication> GetApplications()
        {
            Debug.WriteLine("Called Service at {0}", DateTime.Now);
            return db.tblApplication;
        }

        // GET: odata/Applications(5)
        [EnableQuery]
        public SingleResult<tblApplication> GettblApplication([FromODataUri] Guid key)
        {
            return SingleResult.Create(db.tblApplication.Where(tblApplication => tblApplication.ID == key));
        }

        // PUT: odata/Applications(5)
        public IHttpActionResult Put([FromODataUri] Guid key, Delta<tblApplication> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            tblApplication tblApplication = db.tblApplication.Find(key);
            if (tblApplication == null)
            {
                return NotFound();
            }
            //dawa: update
            patch.GetEntity().ModifiedDate = DateTime.Now;
            //patch.GetEntity().ModifiedBy = User.Identity.Name;

            patch.Put(tblApplication);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblApplicationExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(tblApplication);
        }

        // POST: odata/Applications
        public IHttpActionResult Post(tblApplication tblApplication)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tblApplication.Add(tblApplication);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (tblApplicationExists(tblApplication.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(tblApplication);
        }

        // PATCH: odata/Applications(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] Guid key, Delta<tblApplication> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            tblApplication tblApplication = db.tblApplication.Find(key);
            if (tblApplication == null)
            {
                return NotFound();
            }

            patch.Patch(tblApplication);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblApplicationExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(tblApplication);
        }

        // DELETE: odata/Applications(5)
        public IHttpActionResult Delete([FromODataUri] Guid key)
        {
            tblApplication tblApplication = db.tblApplication.Find(key);
            if (tblApplication == null)
            {
                return NotFound();
            }

            db.tblApplication.Remove(tblApplication);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Applications(5)/tblApplicationConnection
        [EnableQuery]
        public IQueryable<tblApplicationConnection> GettblApplicationConnection([FromODataUri] Guid key)
        {
            return db.tblApplication.Where(m => m.ID == key).SelectMany(m => m.tblApplicationConnection);
        }

        // GET: odata/Applications(5)/tblApplicationVariable
        [EnableQuery]
        public IQueryable<tblApplicationVariable> GettblApplicationVariable([FromODataUri] Guid key)
        {
            return db.tblApplication.Where(m => m.ID == key).SelectMany(m => m.tblApplicationVariable);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblApplicationExists(Guid key)
        {
            return db.tblApplication.Count(e => e.ID == key) > 0;
        }
    }
}
