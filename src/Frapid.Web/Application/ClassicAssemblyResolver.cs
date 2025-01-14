﻿using System.Collections.Generic;
using System.Reflection;
using System.Web.Http.Dispatcher;
using Frapid.Framework;

namespace Frapid.Web
{
    public class ClassicAssemblyResolver : DefaultAssembliesResolver
    {
        public override ICollection<Assembly> GetAssemblies()
        {
            var baseAssemblies = base.GetAssemblies();
            var assemblies = new List<Assembly>(baseAssemblies);
            var items = FrapidApiController.GetMembers();

            foreach (var item in items)
            {
                baseAssemblies.Add(item);
            }

            return assemblies;
        }
    }
}