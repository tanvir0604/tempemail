"use server";

import { revalidatePath } from "next/cache";
import axios, { AxiosRequestConfig, HttpStatusCode, Method } from "axios";
import qs from "qs";
import { SimpleResponseType } from "@repo/validation";
const API_URL = process.env.API_BASE_URL ?? "http://localhost:3001";

interface RequestOptions<T = unknown> {
    method: Method;
    url: string;
    data?: T;
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
    auth?: boolean;
}

export async function revalidate(path: string) {
    revalidatePath(path);
}

export default async function get(
    url: string,
    params: Record<string, unknown> = {},
    headers: Record<string, string> = {}
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
    headers: Record<string, string>
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
    options: RequestOptions<TBody>
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
            qs.stringify(params, { arrayFormat: "repeat" }),
    };
    try {
        const response = await axios.request<TResponse>(config);
        return response.data;
    } catch (e) {
        console.log(e);
        return null as unknown as TResponse;
    }
}

export async function generateTempEmail() {
    const response: SimpleResponseType = await httpRequest({
        method: "POST",
        url: "/create-alias",
        data: {},
    });
    if (!response) {
        return {
            statusCode: 400,
            message: "Bad Request",
        };
    }
    return response;
}

export async function getTempEmail(id: string) {
    const response: SimpleResponseType = await httpRequest({
        method: "GET",
        url: "/temp-email/" + id,
        data: {},
    });
    if (!response) {
        return {
            statusCode: 400,
            message: "Bad Request",
        };
    }
    return response;
}

export async function getEmailContent(email: string) {
    const response: SimpleResponseType = await httpRequest({
        method: "GET",
        url: "/email-content",
        params: { tempEmailRef: email },
    });

    if (!response) {
        return {
            statusCode: 400,
            message: "Bad Request",
        };
    }
    return response;
}

export async function extendTime(id: string) {
    const response: SimpleResponseType = await httpRequest({
        method: "PUT",
        url: "/temp-email/" + id,
        data: { expiredMinutes: 30 },
    });

    if (!response) {
        return {
            statusCode: 400,
            message: "Bad Request",
        };
    }
    return response;
}

export async function checkEmail(email: string) {
    const response: SimpleResponseType = await httpRequest({
        method: "PUT",
        url: "/temp-email/check-email/" + email,
    });

    if (!response || response.statusCode !== 200) {
        return {
            statusCode: 400,
            message: "Bad Request",
        };
    }

    return response;
}
