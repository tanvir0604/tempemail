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
