import IPayloadAPI, { callAPIContent } from "@/lib/axios";
import { IDashboardStatistics } from "./dashboard.types";

export const getDashboardStatisticsFromAPI = () => {
    const options: IPayloadAPI = {
        method: 'GET',
        servicePath: 'dashboard',
        uri: 'statistics',
    };
    return callAPIContent(options);
};

