// ReSharper disable All
using System;
using System.Collections.Generic;
using System.Dynamic;
using Frapid.NPoco;
using Frapid.Account.Entities;
namespace Frapid.Account.DataAccess
{
    public interface ICanConfirmRegistrationRepository
    {

        System.Guid Token { get; set; }

        /// <summary>
        /// Prepares and executes ICanConfirmRegistrationRepository.
        /// </summary>
        bool Execute();
    }
}