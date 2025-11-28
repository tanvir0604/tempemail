import sanitizeHtml from "sanitize-html";

export const sanitize = (html: string) => {
    if (!html) return "";
    return sanitizeHtml(html, {
        allowedTags: [
            "a",
            "b",
            "i",
            "u",
            "strong",
            "em",
            "br",
            "p",
            "div",
            "span",
            "table",
            "thead",
            "tbody",
            "tr",
            "td",
            "th",
            "img",
            "ul",
            "ol",
            "li",
            "hr",
        ],
        allowedAttributes: {
            "*": [
                "style",
                "class",
                "cellpadding",
                "cellspacing",
                "border",
                "width",
                "height",
                "align",
                "valign",
                "bgcolor",
            ],
            a: ["href", "name", "target"],
            img: ["src", "alt"],
        },
        allowedSchemes: ["http", "https", "mailto", "tel"],
        allowedStyles: {
            "*": {
                background: [/^.*$/],
                "background-color": [/^.*$/],
                color: [/^.*$/],
                border: [/^.*$/],
                "border-top": [/^.*$/],
                "border-right": [/^.*$/],
                "border-bottom": [/^.*$/],
                "border-left": [/^.*$/],
                "border-width": [/^.*$/],
                "border-style": [/^.*$/],
                "border-color": [/^.*$/],
                "border-radius": [/^.*$/],
                padding: [/^.*$/],
                "padding-top": [/^.*$/],
                "padding-right": [/^.*$/],
                "padding-bottom": [/^.*$/],
                "padding-left": [/^.*$/],
                margin: [/^.*$/],
                "margin-top": [/^.*$/],
                "margin-right": [/^.*$/],
                "margin-bottom": [/^.*$/],
                "margin-left": [/^.*$/],
                "text-align": [/^.*$/],
                "text-decoration": [/^.*$/],
                "text-transform": [/^.*$/],
                "font-size": [/^.*$/],
                "font-weight": [/^.*$/],
                "font-family": [/^.*$/],
                "font-style": [/^.*$/],
                "vertical-align": [/^.*$/],
                width: [/^.*$/],
                height: [/^.*$/],
                "min-width": [/^.*$/],
                "min-height": [/^.*$/],
                "max-width": [/^.*$/],
                "max-height": [/^.*$/],
                "line-height": [/^.*$/],
                display: [/^.*$/],
            },
        },
        nonTextTags: ["style", "script", "textarea", "option"],
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
