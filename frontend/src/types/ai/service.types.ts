export type IBaseServiceRequestParams = Record<string, string | string[] | number | boolean> | undefined;
export type IBaseServiceRequestHeaders = Record<string, string> | undefined;

export interface IBaseServiceRequest<
  TParams = IBaseServiceRequestParams,
  THeaders = IBaseServiceRequestHeaders,
  TBody = any
> {
  url: string;
  params: TParams;
  headers?: THeaders;
  method: "get" | "post" | "put" | "delete";
  body?: TBody;
}

export interface IBaseServiceResponse<TData = unknown> {
  status: number;
  status_text?: string;
  data?: TData;
  headers?: Record<string, any>;
  error?: any;
}

export interface IBaseServiceApi {
  request: IBaseServiceRequest;
  response: IBaseServiceResponse;
}

export interface IBaseServiceRequest {
  [key: string]: any;
}

export interface IBaseServiceResponse {
  [key: string]: any;
}

export interface IBaseServiceConfig {
  api_key?: string;
  base_url?: string;
}
