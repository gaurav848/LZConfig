using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lubrizol.LZConfig.Data;

namespace LZConfig.Batch
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Test connection to database");
            using (LZConfigContext context = new LZConfigContext())
            {
                foreach (var tblApplication in context.tblApplication)
                {
                    Console.WriteLine(tblApplication.Name);
                }
            }

        }
    }
}
