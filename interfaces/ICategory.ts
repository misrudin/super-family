export interface ICategory {
    id: string;
    name: string;
    slug: string;
    type: "income" | "expense";
    created_at: string;
    updated_at?: string;
}

export interface ICategoryBody {
    name: string;
    slug: string;
    type: "income" | "expense";
}