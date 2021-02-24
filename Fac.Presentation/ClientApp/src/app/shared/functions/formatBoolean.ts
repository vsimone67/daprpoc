export function formatBoolean(value: boolean) {
  var retval = "Yes";

  if (!value) {
    retval = "No";
  }
  return retval;

}
