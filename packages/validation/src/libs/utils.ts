import sanitizeHtml from 'sanitize-html';

export const sanitize = (html: string) => {
    if (!html) return '';
    return sanitizeHtml(html, {
        allowedTags: [
            'a',
            'b',
            'i',
            'u',
            'strong',
            'em',
            'br',
            'p',
            'div',
            'span',
            'table',
            'thead',
            'tbody',
            'tr',
            'td',
            'th',
            'img',
            'ul',
            'ol',
            'li',
            'hr',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
        ],
        allowedAttributes: {
            '*': [
                'style',
                'class',
                'cellpadding',
                'cellspacing',
                'border',
                'width',
                'height',
                'align',
                'valign',
                'bgcolor',
                'role',
                'aria-label',
                'dir',
                'colspan',
                'rowspan',
            ],
            a: ['href', 'name', 'target', 'rel'],
            img: ['src', 'alt', 'title', 'unsafe-src', 'width', 'height'],
            table: ['role', 'cellpadding', 'cellspacing', 'border'],
            td: ['colspan', 'rowspan'],
            th: ['colspan', 'rowspan'],
            tr: ['role'],
            span: ['style'],
        },
        allowedSchemes: ['http', 'https', 'mailto', 'tel'],
        allowedStyles: {
            '*': {
                background: [/^.*$/],
                'background-color': [/^.*$/],
                color: [/^.*$/],
                border: [/^.*$/],
                'border-top': [/^.*$/],
                'border-right': [/^.*$/],
                'border-bottom': [/^.*$/],
                'border-left': [/^.*$/],
                'border-width': [/^.*$/],
                'border-style': [/^.*$/],
                'border-color': [/^.*$/],
                'border-radius': [/^.*$/],
                padding: [/^.*$/],
                'padding-top': [/^.*$/],
                'padding-right': [/^.*$/],
                'padding-bottom': [/^.*$/],
                'padding-left': [/^.*$/],
                margin: [/^.*$/],
                'margin-top': [/^.*$/],
                'margin-right': [/^.*$/],
                'margin-bottom': [/^.*$/],
                'margin-left': [/^.*$/],
                'text-align': [/^.*$/],
                'text-decoration': [/^.*$/],
                'text-transform': [/^.*$/],
                'font-size': [/^.*$/],
                'font-weight': [/^.*$/],
                'font-family': [/^.*$/],
                'font-style': [/^.*$/],
                'vertical-align': [/^.*$/],
                width: [/^.*$/],
                height: [/^.*$/],
                'min-width': [/^.*$/],
                'min-height': [/^.*$/],
                'max-width': [/^.*$/],
                'max-height': [/^.*$/],
                'line-height': [/^.*$/],
                display: [/^.*$/],
                'letter-spacing': [/^.*$/],
                'word-spacing': [/^.*$/],
                opacity: [/^\d*\.?\d+$/],
                float: [/^(left|right|none)$/],
                clear: [/^(left|right|both|none)$/],
                'word-break': [/^.*$/],
            },
        },
        nonTextTags: ['style', 'script', 'textarea', 'option'],
    });
};

export function generateUniqueSlug(
    title: string,
    unique: boolean = false,
): string {
    const baseSlug = title
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+|-+$/g, '');

    if (!unique) return baseSlug;
    const uniqueSuffix = Date.now().toString(36);
    return `${baseSlug}-${uniqueSuffix}`;
}

export function dateString(daysAgo = 1) {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d
        .toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
        .replace(',', '');
}

export function getRabbitMqUrl(): string {
    const user = process.env.RABBITMQ_USER ?? 'guest';
    const pass = encodeURIComponent(process.env.RABBITMQ_PASSWORD ?? 'guest');
    const host = process.env.RABBITMQ_HOST ?? 'localhost';
    const port = process.env.RABBITMQ_PORT ?? '5672';
    const rabbitUrl = `amqp://${user}:${pass}@${host}:${port}`;
    console.log('rabbitUrl', rabbitUrl);
    return rabbitUrl;
}

export function formatNumber(num: number): string {
    if (!num && num !== 0) return '0';

    const absNum = Math.abs(num);

    if (absNum >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    }

    if (absNum >= 1_000_000) {
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    }

    if (absNum >= 1_000) {
        return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    }

    return num.toString();
}
