export interface IParamLogin {
    email: string;
    password: string;
}

export interface IParamRegister {
    name: string;
    email: string;
    phone?: string;
    password: string;
    confirm_password: string;
}