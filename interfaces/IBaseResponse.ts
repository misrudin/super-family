export interface IBaseResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
    metadata?: IMetadata;
}

export interface IMetadata {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
}