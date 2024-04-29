import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

type Headers = Record<string, string>;
type Params = Record<string, string | number | boolean>;


const axiosInstance: AxiosInstance = axios.create();


interface ResponseData<T> {
  data: T;
}

type ApiConnector = <T>(
  method: string,
  url: string,
  bodyData?: any,
  headers?: Headers,
  params?: Params
) => Promise<ResponseData<T>>;


export const apiConnector: ApiConnector = async (
  method,
  url,
  bodyData,
  headers,
  params
) => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : ({} as Headers),
    params: params ? params : null,
  };

  return axiosInstance.request(config);
};
