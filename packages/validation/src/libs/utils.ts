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
                "background-color": [
                    /^#[0-9a-fA-F]{3,6}$/,
                    /^rgb\(/,
                    /^rgba\(/,
                ],
                background: [
                    /^#[0-9a-fA-F]{3,6}$/,
                    /^rgb\(/,
                    /^rgba\(/,
                    /^url\(/,
                ],
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
