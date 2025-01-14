using System;

namespace Frapid.NPoco
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
    public class ComputedColumnAttribute : ColumnAttribute
    {
        public ComputedColumnAttribute() { }
        public ComputedColumnAttribute(string name) : base(name) { }
    }
}