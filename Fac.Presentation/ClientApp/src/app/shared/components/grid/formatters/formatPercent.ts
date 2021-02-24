export function formatPercent(data) {
  var number = data.value;
  // this puts commas into the number eg 1000 goes to 1,000,
  return Math.round(Math.floor(number))
    .toString() + "%"

}
