export interface IFamily {
    id: string;
    name: string;
    slug: string;
    created_at: string;
    updated_at?: string;
}

export interface IFamilyBody {
    name: string;
    slug: string;
}