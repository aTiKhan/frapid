// ReSharper disable All
using System;
using System.Collections.Generic;
using Frapid.Account.DataAccess;
using Frapid.Account.Entities;

namespace Frapid.Account.Api.Fakes
{
    public class GetUserIdByEmailRepository : IGetUserIdByEmailRepository
    {
        public string Email { get; set; }

        public int Execute()
        {
            return 1;
        }
    }
}