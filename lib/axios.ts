import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { NextPageContext } from 'next';

import {
    clearCookies,
    getBasicTokenString
} from '@/helpers/credentials';
import { setWindowLocation } from '@/helpers/window';
import { configEnv } from './config';

type ListMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface IDefaultHeaders {
    Accept: string;
    'Content-Type': string;
    Authorization?: string;
}

export default interface IPayloadAPI {
    method: ListMethods;
    uri?: string;
    params?: object;
    additionalHeader?: object;
    servicePath?: string
    hostApi?: string;
}

export const setHeaders = (
    dataHeaders: IDefaultHeaders,
    token: string | undefined,
) => {
    if (token) {
        dataHeaders.Authorization = `${token}`;
    }
    return dataHeaders;
};

export const setAxiosOptions = (
    token: string,
): { headers: IDefaultHeaders } => ({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    },
});

export const setParams = (params, method: ListMethods) => {
    const getMethods = ['GET', 'DELETE'];
    if (getMethods.includes(method)) {
        return {
            params,
        };
    }
    return {
        data: params,
    };
};

export const callAPI = async ({
    method,
    uri,
    params,
    additionalHeader,
    additionalConfig,
    context,
    hostApi = '',
    servicePath = '',
    signal,
}: {
    method: ListMethods;
    uri?: string;
    params?: object;
    additionalHeader?: object;
    additionalConfig?: AxiosRequestConfig;
    context?: NextPageContext;
    hostApi?: string;
    servicePath?: string;
    signal?: AbortSignal;
}) => {
    const defaultHeaders: IDefaultHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
    let url: string = `${hostApi}/${servicePath}`;
    if (uri) {
        url = url + `/${uri}`;
    }
    let headers = { ...defaultHeaders, ...additionalHeader };

    const token = getBasicTokenString(context);
    headers = setHeaders(headers, token);

    const dataOrParams = setParams(params, method);
    const defaultConfig = { method, headers, url, retry: false };
    const config: AxiosRequestConfig = {
        ...defaultConfig,
        ...dataOrParams,
        ...additionalConfig,
        signal,
    };
    const callbackError = (error: AxiosError) => callbackErrorFunction(error, context);
    axios.interceptors.response.use(returnResponse, callbackError);
    return axios(config);
};

export const returnResponse = (response: AxiosResponse) => response;

export const callbackErrorFunction = async (
    error: AxiosError,
    context?: NextPageContext,
) => {
    const statusCode: number = error?.response?.status;
    if (!statusCode) {
        return Promise.reject({
            response: {
                success: false,
                message: 'Terjadi kesalahan pada server, silahkan coba beberapa saat lagi',
                data: null,
            },
        });
    }

    // Reject all failed request other than 401
    if (statusCode !== 401) {
        return Promise.reject(error);
    }

    if (statusCode === 401) {
        clearCookies(context);
        await getBasicTokenString(context);
        setWindowLocation('/login');
    }

    return Promise.reject(error);
};

export const callAPIContent = (paramsRequests: IPayloadAPI) => {
    const hostApi: string = configEnv.restApiUrlCsr;

    const params: IPayloadAPI = {
        ...paramsRequests,
        hostApi,
    };

    return callAPI(params);
};
