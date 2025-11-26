import sanitizeHtml from "sanitize-html";

export const sanitize = (html: string) => {
    return sanitizeHtml(html, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: ["src", "alt"],
        },
        allowedSchemes: ["http", "https", "data"],
    });
};
