using KTMS.Infrastructure.DataBase;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using Services.Providers;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class DatabaseBackupService : IHostedService, IDisposable
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<DatabaseBackupService> _logger;
        private Timer _timer;

        public DatabaseBackupService(IServiceProvider serviceProvider, ILogger<DatabaseBackupService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(BackupDatabase, null, TimeSpan.Zero, TimeSpan.FromHours(48));
            return Task.CompletedTask;
        }

        private void BackupDatabase(object state)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<KTMSDbContext>();
                var backupProvider = scope.ServiceProvider.GetRequiredService<IDatabaseBackupProvider>();

                try
                {
                    backupProvider.CreateBackup(dbContext);
                    _logger.LogInformation("Database backup completed at: " + DateTime.Now);
                }
                catch (Exception ex)
                {
                    _logger.LogError("Error during database backup: " + ex.Message);
                }
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("DatabaseBackupService is stopping.");
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
