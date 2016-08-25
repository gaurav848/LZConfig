using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Lubrizol.LZConfig.Core.Configuration;


namespace Lubrizol.LZConfig.Core.Logging
{
    public static class LogHelper
    {
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static void LogException(Exception ex)
        {
            Debug.WriteLine(ex.Message);
            Lubrizol.LZApps.LogHelper.LogError(ex);
        }

        public static void LogTraceVerbose(string message)
        {
            if (Environment.UserInteractive)
                Console.WriteLine(message);

            Debug.WriteLine(message);
        }

        public static void LogStatement(string statement, string user)
        {
            string sql = String.Format("INSERT INTO Audits VALUES('{0}','{1}',GETDATE(),'{1}', GETDATE())", statement, user);
            using (SqlConnection conn = new SqlConnection(ConfigHelper.GetDefaultConnectionString()))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(sql, conn))
                {
                    command.ExecuteNonQuery();
                }
            }
        }
    }
}
