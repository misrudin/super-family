export interface IParamGetCategories {
    type?: "income" | "expense";
}

export interface IParamCreateCategory {
    name: string;
    type: "income" | "expense";
    slug: string;
}

export interface IParamUpdateCategory {
    name?: string;
    type?: "income" | "expense";
    slug?: string;
}

export interface IParamDeleteCategory {
    id: string;
}

