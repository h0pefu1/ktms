using KTMS.Infrastructure.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Providers
{
    public interface IDatabaseBackupProvider
    {
        void CreateBackup(KTMSDbContext dbContext);
    }
}
