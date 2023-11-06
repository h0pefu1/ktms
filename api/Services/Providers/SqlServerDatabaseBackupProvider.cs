using KTMS.Infrastructure.DataBase;

using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Providers
{
    public class SqlServerDatabaseBackupProvider : IDatabaseBackupProvider
    {
        private string connectionString;
        private string backupDirectory;

        public SqlServerDatabaseBackupProvider(string connectionString, string backupDirectory)
        {
            this.connectionString = connectionString;
            this.backupDirectory = backupDirectory;
        }

        public void CreateBackup(KTMSDbContext dbContext)
        {
            // Generate a unique backup file name based on date and time
            string backupFileName = $"backup_{DateTime.Now:yyyyMMddHHmmss}.bak";
            string backupFilePath = Path.Combine(backupDirectory, backupFileName);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = System.Data.CommandType.Text;
                    command.CommandText = $"BACKUP DATABASE {dbContext.Database.GetDbConnection().Database} TO DISK = '{backupFilePath}'";

                    try
                    {
                        command.ExecuteNonQuery();
                        Console.WriteLine($"Database backup created at: {backupFilePath}");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error creating database backup: {ex.Message}");
                    }
                }
            }
        }
    }
}
