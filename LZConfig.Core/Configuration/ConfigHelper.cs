using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Lubrizol.LZConfig.Core;

namespace Lubrizol.LZConfig.Core.Configuration
{
    public static class ConfigHelper
    {
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static string GetDefaultConnectionString()
        {
            string connString;
#if DEBUG
            connString =  "server=.;Database=LZConfig;Trusted_Connection=Yes";
#else
                connString = Lubrizol.LZApps.ConfigHelper.GetConnectionString(AppConstants.APPID, AppConstants.Connections.DEFAULT);
#endif
            return connString;
        }
    }
}
