import IPayloadAPI, { callAPIContent } from "@/lib/axios";

export const getProfileFromAPI = () => {
    const options: IPayloadAPI = {
        method: 'GET',
        servicePath: 'account',
        uri: 'profile',
    };
    return callAPIContent(options);
};

export const logoutFromAPI = () => {
    const options: IPayloadAPI = {
        method: 'POST',
        servicePath: 'account',
        uri: 'logout',
    };
    return callAPIContent(options);
};

export const joinFamilyFromAPI = (params: { family_id: string }) => {
    const options: IPayloadAPI = {
        method: 'POST',
        servicePath: 'account',
        uri: 'join-family',
        params,
    };
    return callAPIContent(options);
};
