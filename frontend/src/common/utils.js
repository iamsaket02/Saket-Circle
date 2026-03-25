export function Capitalize(input) {
  if (!input || typeof input !== "string") return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function capitalizeWords(input) {
  if (!input || typeof input !== "string") return input;
  return input
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
