import IPayloadAPI, { callAPIContent } from "@/lib/axios";
import { IParamCreateTransaction, IParamGetTransactionDetail, IParamGetTransactions, IParamUpdateTransaction } from "./transactions.types";

export const getTransactionsFromAPI = (params?: IParamGetTransactions) => {
    const options: IPayloadAPI = {
        method: 'GET',
        servicePath: 'transactions',
        ...(params && { params }),
    };
    return callAPIContent(options);
};

export const getTransactionDetailFromAPI = (params: IParamGetTransactionDetail) => {
    const options: IPayloadAPI = {
        method: 'GET',
        servicePath: 'transactions',
        uri: 'detail',
        params,
    };
    return callAPIContent(options);
};

export const createTransactionFromAPI = (params: IParamCreateTransaction) => {
    const options: IPayloadAPI = {
        method: 'POST',
        servicePath: 'transactions',
        uri: 'create',
        params,
    };
    return callAPIContent(options);
};

export const updateTransactionFromAPI = (params: IParamUpdateTransaction & { id: string }) => {
    const { id, ...bodyParams } = params;
    const options: IPayloadAPI = {
        method: 'PUT',
        servicePath: 'transactions',
        uri: 'update',
        params: {
            id,
            ...bodyParams,
        },
    };
    return callAPIContent(options);
};

