import IPayloadAPI, { callAPIContent } from "@/lib/axios";
import { IParamCreateCategory, IParamDeleteCategory, IParamGetCategories, IParamUpdateCategory } from "./categories.types";

export const getCategoriesFromAPI = (params?: IParamGetCategories) => {
    const options: IPayloadAPI = {
        method: 'GET',
        servicePath: 'categories',
        ...(params && { params }),
    };
    return callAPIContent(options);
};

export const createCategoryFromAPI = (params: IParamCreateCategory) => {
    const options: IPayloadAPI = {
        method: 'POST',
        servicePath: 'categories',
        uri: 'create',
        params,
    };
    return callAPIContent(options);
};

export const updateCategoryFromAPI = (params: IParamUpdateCategory & { id: string }) => {
    const { id, ...bodyParams } = params;
    const options: IPayloadAPI = {
        method: 'PUT',
        servicePath: "categories",
        uri: `update?id=${id}`,
        params: {
            ...bodyParams,
        },
    };
    return callAPIContent(options);
};

export const deleteCategoryFromAPI = (params: IParamDeleteCategory) => {
    const options: IPayloadAPI = {
        method: 'DELETE',
        servicePath: 'categories',
        uri: 'delete',
        params,
    };
    return callAPIContent(options);
};

