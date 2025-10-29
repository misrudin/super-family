import { IFamily } from "./IFamily";

export interface IUser {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: 'admin' | 'member';
    family?: IFamily;
    created_at: string;
    updated_at?: string;
}

export interface ILoginResponse {
    user: IUser;
    token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
}

export interface IRegisterResponse {
    user: IUser;
    token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
}