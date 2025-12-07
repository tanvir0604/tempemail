export type SimpleResponseType = {
    statusCode: number;
    message: string;
    data?: any;
};

export type FindAllDto = {
    where?: {};
    take: number;
    skip: number;
    [key: string]: any;
};

export type ErrorType = {
    statusCode: number;
    message: string;
};

export type ExpiredAliasesGroupType = {
    domain: string;
    ids: string[];
};

export type BlogDetailsType = {
    id: number;
    title: string;
    image: string;
    slug: string;
    content: string;
    status: boolean;
    readingTime: number;
    tag: string;
    publishedAt: Date;
    createdAt: Date;
    updatedAt: Date;
};

export type EmailConfigType = {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
};
export type DomainUserType = {
    id: string;
    username: string;
    password: string;
};
export type DomainType = {
    domain: string;
    apiUrl: string;
    apiKey: string;
    imapHost: string;
    imapPort: number;
    smtpHost: string;
    smtpPort: number;
    smtpSecure: boolean;
    domainUsers: DomainUserType[];
};
