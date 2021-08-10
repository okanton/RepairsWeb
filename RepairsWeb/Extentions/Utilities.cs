using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;

namespace RepairsWeb.Extentions
{
    public static class Utilities
    {
        public static MailAddressCollection GetMailAddresses(IEnumerable<string> mails)
        {
            var result = new MailAddressCollection();
            if (mails.Any())
            {
                foreach (var item in mails)
                {
                    result.Add(item);
                }
            }
            return result;
        }

        public static string GetNumbers(string input)
        {
            return new string(input.Where(c => char.IsDigit(c)).ToArray());
        }

        public static int GetNumbers(int input)
        {
            return int.Parse(new string(input.ToString().Where(c => char.IsDigit(c)).ToArray()));
        }

        public static string GetErrorString(this Exception ex)
        {
            var innerEx = ex.InnerException != null ? ex.InnerException.Message : "";
            var resultString = $"Exception: {ex.Message} / InnerException: {innerEx}";
            return resultString;
        }
    }
}