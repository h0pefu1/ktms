﻿using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Security
{
    public interface IUserService
    {
        Task<UserResource> Register(RegisterResource resource);
        UserResource Login(LoginResource resource);
        User GetUser(UserResource userModel);

        User GetUserByName(int Id);
    }
}
