export interface IParamGetTransactions {
    page?: number;
    limit?: number;
    family_id?: string;
    user_id?: string;
    category_id?: string;
}

export interface IParamGetTransactionDetail {
    id: string;
}

export interface IParamCreateTransaction {
    amount: number | string;
    category_id: string;
    note?: string;
}

export interface IParamUpdateTransaction {
    amount?: number | string;
    category_id?: string;
    note?: string;
}

