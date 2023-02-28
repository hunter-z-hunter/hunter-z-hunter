export default function slugify(text: string): string {
  // Remove any non-alphanumeric characters (except for hyphens and underscores)
  text = text
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase();

  // Replace any spaces with hyphens
  text = text.replace(/\s+/g, "-");

  // Trim any leading or trailing hyphens
  text = text.replace(/^-+|-+$/g, "");

  return text;
}
