import IPayloadAPI, { callAPIContent } from "@/lib/axios";
import { IParamCreateFamily, IParamDeleteFamily, IParamGetFamilyDetail, IParamUpdateFamily } from "./families.types";

export const getFamiliesFromAPI = () => {
    const options: IPayloadAPI = {
        method: 'GET',
        servicePath: 'families',
    };
    return callAPIContent(options);
};

export const getFamilyDetailFromAPI = (params: IParamGetFamilyDetail) => {
    const options: IPayloadAPI = {
        method: 'GET',
        servicePath: 'families',
        uri: 'detail',
        params,
    };
    return callAPIContent(options);
};

export const createFamilyFromAPI = (params: IParamCreateFamily) => {
    const options: IPayloadAPI = {
        method: 'POST',
        servicePath: 'families',
        uri: 'create',
        params,
    };
    return callAPIContent(options);
};

export const updateFamilyFromAPI = (params: IParamUpdateFamily & { id: string }) => {
    const { id, ...bodyParams } = params;
    const options: IPayloadAPI = {
        method: 'PUT',
        servicePath: 'families',
        uri: `update?id=${id}`,
        params: {
            ...bodyParams,
        },
    };
    return callAPIContent(options);
};

export const deleteFamilyFromAPI = (params: IParamDeleteFamily) => {
    const options: IPayloadAPI = {
        method: 'DELETE',
        servicePath: 'families',
        uri: 'delete',
        params,
    };
    return callAPIContent(options);
};

export const generateInviteLinkFromAPI = () => {
    const options: IPayloadAPI = {
        method: 'POST',
        servicePath: 'families',
        uri: 'generate-invite',
    };
    return callAPIContent(options);
};

