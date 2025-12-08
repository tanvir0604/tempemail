const path = require('path');

module.exports = {
    apps: [
        {
            name: 'temp-email-web',
            script: 'pnpm',
            args: '--filter=web start',
            cwd: path.resolve(__dirname, './apps/web'),
            env: {
                NODE_ENV: 'production',
            },
        },
        {
            name: 'temp-email-api',
            script: 'pnpm',
            args: '--filter=api start',
            cwd: path.resolve(__dirname, './apps/api'),
            env: {
                NODE_ENV: 'production',
            },
        },
        {
            name: 'temp-email-mailcow',
            script: 'pnpm',
            args: '--filter=mailcow start',
            cwd: path.resolve(__dirname, './apps/mailcow'),
            env: {
                NODE_ENV: 'production',
            },
        },
        {
            name: 'temp-email-settings',
            script: 'pnpm',
            args: '--filter=settings start',
            cwd: path.resolve(__dirname, './apps/settings'),
            env: {
                NODE_ENV: 'production',
            },
        },
        {
            name: 'temp-email-blog',
            script: 'pnpm',
            args: '--filter=blog start',
            cwd: path.resolve(__dirname, './apps/blog'),
            env: {
                NODE_ENV: 'production',
            },
        },
        {
            name: 'temp-email-email',
            script: 'pnpm',
            args: '--filter=email start',
            cwd: path.resolve(__dirname, './apps/email'),
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
