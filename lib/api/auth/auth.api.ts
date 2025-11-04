import IPayloadAPI, { callAPIContent } from "@/lib/axios";
import { IParamLogin, IParamRegister } from "./auth.types";

export const submitLoginFromAPI = (params: IParamLogin) => {
  const options: IPayloadAPI = {
    method: 'POST',
    servicePath: 'auth',
    uri: 'login',
    params,
  };
  return callAPIContent(options);
};

export const submitRegisterFromAPI = (params: IParamRegister) => {
  const options: IPayloadAPI = {
    method: 'POST',
    servicePath: 'auth',
    uri: 'register',
    params,
  };
  return callAPIContent(options);
};
