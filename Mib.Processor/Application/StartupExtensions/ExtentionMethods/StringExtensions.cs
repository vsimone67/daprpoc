namespace Mib.Processor.Extensions
{
    public static class StringExtentions
    {
        public static string NullToEmpty(this string stringToCheck)
        {
            string retval = stringToCheck;

            if (string.IsNullOrEmpty(stringToCheck))
                retval = string.Empty;

            return retval;
        }
        public static string RemoveWhiteSpaces(this string value)
        {
            return value?.Replace(" ", string.Empty);
        }
    }

}
