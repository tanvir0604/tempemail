'use server';

import { revalidatePath } from 'next/cache';
import axios, { AxiosRequestConfig, HttpStatusCode, Method } from 'axios';
import qs from 'qs';
import {
    GetListDto,
    SendEmailDto,
    SendEmailSchema,
    SimpleResponseType,
    TempEmailType,
} from '@repo/validation';
const API_URL = process.env.API_BASE_URL ?? 'http://localhost:3001';

interface RequestOptions<T = unknown> {
    method: Method;
    url: string;
    data?: T;
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
    auth?: boolean;
    clientIp?: string;
    userAgent?: string;
}

export async function revalidate(path: string) {
    revalidatePath(path);
}

export default async function get(
    url: string,
    params: Record<string, unknown> = {},
    headers: Record<string, string> = {},
) {
    try {
        const response = await axios.get(API_URL + url, { params, headers });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function post(
    url: string,
    body: unknown,
    headers: Record<string, string>,
) {
    try {
        const response = await axios.post(API_URL + url, body, { headers });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function httpRequest<TResponse = unknown, TBody = unknown>(
    options: RequestOptions<TBody>,
): Promise<TResponse> {
    const { method, url, data, params, headers, auth = true } = options;
    const finalHeaders = headers ?? {};
    const config: AxiosRequestConfig = {
        method,
        url: API_URL + url,
        data,
        params,
        headers: finalHeaders,
        paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: 'repeat' }),
    };
    try {
        const response = await axios.request<TResponse>(config);
        return response.data;
    } catch (e) {
        console.log(e);
        return null as unknown as TResponse;
    }
}

export async function generateTempEmail(locale = 'en', userId?: string) {
    const response: SimpleResponseType = await httpRequest({
        method: 'POST',
        url: '/create-alias',
        data: { userId, locale },
    });
    if (!response) {
        return {
            statusCode: 400,
            message: 'Bad Request',
        };
    }
    return response;
}

export async function getTempEmail(id: string) {
    const response: SimpleResponseType = await httpRequest({
        method: 'GET',
        url: '/temp-email/' + id,
        data: {},
    });
    if (!response) {
        return {
            statusCode: 400,
            message: 'Bad Request',
        };
    }
    return response;
}

export async function getEmailContent(email: string) {
    const response: SimpleResponseType = await httpRequest({
        method: 'GET',
        url: '/email-content',
        params: { tempEmailRef: email },
    });

    if (!response) {
        return {
            statusCode: 400,
            message: 'Bad Request',
        };
    }
    return response;
}

export async function extendTime(id: string) {
    const response: SimpleResponseType = await httpRequest({
        method: 'PUT',
        url: '/temp-email/' + id,
        data: { expiredMinutes: 30 },
    });

    if (!response) {
        return {
            statusCode: 400,
            message: 'Bad Request',
        };
    }
    return response;
}

export async function checkEmail(email: string) {
    const response: SimpleResponseType = await httpRequest({
        method: 'PUT',
        url: '/temp-email/check-email/' + email,
    });

    if (!response || response.statusCode !== 200) {
        return {
            statusCode: 400,
            message: 'Bad Request',
        };
    }

    return response;
}

export async function deleteEmail(emailData: TempEmailType) {
    const response: SimpleResponseType = await httpRequest({
        method: 'DELETE',
        url: '/temp-email/' + emailData.id,
    });

    if (!response || response.statusCode !== 200) {
        return {
            statusCode: 400,
            message: 'Bad Request',
        };
    }

    httpRequest({
        method: 'DELETE',
        url: '/mailcow/delete',
        data: {
            email: emailData.email.split('@')[0],
            ids: [Number(emailData.emailId)],
        },
    });

    // if (!response2 || response2.statusCode !== 200) {
    //     return {
    //         statusCode: 400,
    //         message: 'Bad Request',
    //     };
    // }

    return response;
}

export async function getFile(filename: string) {
    const response: SimpleResponseType = await httpRequest({
        method: 'GET',
        url: '/settings/file/' + filename,
    });

    if (!response || response.statusCode !== 200) {
        return {
            statusCode: 400,
            message: 'Bad Request',
        };
    }

    return response;
}

export async function getBlogList(
    params: GetListDto,
): Promise<SimpleResponseType> {
    const response: SimpleResponseType = await httpRequest({
        method: 'GET',
        url: '/blog',
        params: {
            page: params.pageNumber ?? 1,
            perPage: params.pageSize ?? 20,
        },
    });

    if (!response || response.statusCode !== 200) {
        return {
            statusCode: 400,
            message: 'Bad Request',
        };
    }

    return response;
}

export async function getBlogDetails(
    slug: string,
): Promise<SimpleResponseType> {
    const response: SimpleResponseType = await httpRequest({
        method: 'GET',
        url: '/blog/slug/' + slug,
    });

    if (!response || response.statusCode !== 200) {
        return {
            statusCode: 400,
            message: 'Bad Request',
        };
    }

    return response;
}

export async function sendEmail(
    values: SendEmailDto,
): Promise<SimpleResponseType> {
    const validation = SendEmailSchema.safeParse(values);

    if (!validation.success) {
        return {
            statusCode: 400,
            message: validation.error.message,
        };
    }
    const response: SimpleResponseType = await httpRequest({
        method: 'POST',
        url: '/email/send',
        data: validation.data,
    });

    if (!response || response.statusCode !== 200) {
        return {
            statusCode: 400,
            message: 'Bad Request',
        };
    }

    return response;
}
