import { defineRouting } from 'next-intl/routing';

import { locales, defaultLocale } from '@repo/validation';

export const routing = defineRouting({
    locales,
    defaultLocale,
});
