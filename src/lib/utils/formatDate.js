export function formatDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
