﻿using Frapid.ApplicationState.Models;

namespace Frapid.Dashboard.ViewModels
{
    public class Dashboard
    {
        public string Culture { get; set; }
        public string Language { get; set; }
        public string JqueryUIi18NPath { get; set; }
        public string Today { get; set; }
        public string Now { get; set; }
        public int? UserId { get; set; }
        public string User { get; set; }
        public string Office { get; set; }
        public LoginView MetaView { get; set; }
        public string ShortDateFormat { get; set; }
        public string LongDateFormat { get; set; }
        public string ThousandSeparator { get; set; }
        public string DecimalSeparator { get; set; }
        public int CurrencyDecimalPlaces { get; set; }
        public string CurrencySymbol { get; set; }
        public string DatepickerFormat { get; set; }
        public bool DatepickerShowWeekNumber { get; set; }
        public int DatepickerWeekStartDay { get; set; }
        public string DatepickerNumberOfMonths { get; set; }
    }
}