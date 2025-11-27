import sanitizeHtml from "sanitize-html";

export const sanitize = (html: string) => {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "style"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height", "style", "class"],
      "*": ["style", "class", "id"],
    },
    allowedSchemes: ["http", "https", "data"],
    allowVulnerableTags: false,
    allowedStyles: {
      "*": {
        // Allow common CSS properties
        color: [/^#[0-9a-fA-F]{3,6}$/, /^rgb\(/, /^rgba\(/, /^\w+$/],
        "background-color": [/^#[0-9a-fA-F]{3,6}$/, /^rgb\(/, /^rgba\(/],
        background: [/^#[0-9a-fA-F]{3,6}$/, /^rgb\(/, /^rgba\(/, /^url\(/],
        "font-size": [/^\d+(?:px|em|rem|%|pt)$/],
        "font-weight": [/^\d+$/, /^bold$/, /^normal$/],
        "font-family": [/.*/],
        "text-align": [/^left$/, /^right$/, /^center$/, /^justify$/],
        "text-decoration": [/.*/],
        margin: [/^\d+(?:px|em|rem|%)$/],
        "margin-top": [/^\d+(?:px|em|rem|%)$/],
        "margin-bottom": [/^\d+(?:px|em|rem|%)$/],
        "margin-left": [/^\d+(?:px|em|rem|%)$/],
        "margin-right": [/^\d+(?:px|em|rem|%)$/],
        padding: [/^\d+(?:px|em|rem|%)$/],
        "padding-top": [/^\d+(?:px|em|rem|%)$/],
        "padding-bottom": [/^\d+(?:px|em|rem|%)$/],
        "padding-left": [/^\d+(?:px|em|rem|%)$/],
        "padding-right": [/^\d+(?:px|em|rem|%)$/],
        border: [/.*/],
        "border-radius": [/^\d+(?:px|em|rem|%)$/],
        width: [/^\d+(?:px|em|rem|%)$/],
        height: [/^\d+(?:px|em|rem|%)$/],
        "max-width": [/^\d+(?:px|em|rem|%)$/],
        "max-height": [/^\d+(?:px|em|rem|%)$/],
        display: [/.*/],
        position: [/^static$/, /^relative$/, /^absolute$/, /^fixed$/],
        top: [/^\d+(?:px|em|rem|%)$/],
        bottom: [/^\d+(?:px|em|rem|%)$/],
        left: [/^\d+(?:px|em|rem|%)$/],
        right: [/^\d+(?:px|em|rem|%)$/],
        float: [/^left$/, /^right$/, /^none$/],
        clear: [/^both$/, /^left$/, /^right$/, /^none$/],
      },
    },
  });
};

export function generateUniqueSlug(
  title: string,
  unique: boolean = false
): string {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!unique) return baseSlug;
  const uniqueSuffix = Date.now().toString(36);
  return `${baseSlug}-${uniqueSuffix}`;
}

export function dateString(daysAgo = 1) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(",", "");
}
