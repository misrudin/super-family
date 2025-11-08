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

export interface IFamilyDetail extends IFamily {
    members?: Array<{
        id: string;
        name: string;
        email: string;
        phone?: string;
        role: 'admin' | 'member';
        created_at?: string;
        updated_at?: string;
    }>;
}