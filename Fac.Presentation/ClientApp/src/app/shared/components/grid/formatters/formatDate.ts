export function formatDate(data) {
  return data.value ? new Date(data.value).toLocaleDateString() : "";
}
