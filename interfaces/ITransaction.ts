import { ICategory } from "./ICategory";
import { IFamily } from "./IFamily";
import { IUser } from "./IUser";

export interface ITransaction {
    id: string;
    amount: number;
    category: ICategory;
    user: IUser;
    family: IFamily;
    transaction_date: string;
    transaction_no: string;
    created_at: string;
    updated_at?: string;
}

export interface ITransactionBody {
    amount: number;
    category_id: string;
    user_id: string;
    family_id: string;
    transaction_date: string;
    transaction_no: string;
}