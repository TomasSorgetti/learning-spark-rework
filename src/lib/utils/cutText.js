export function cutText(text, limit = 100) {
  if (text.length > limit) {
    return text.slice(0, limit) + "...";
  }
  return text;
}
