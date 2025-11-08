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
