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
