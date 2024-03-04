import { AxiosResponse } from 'axios';

export type TAPIResponse<Type> = Promise<AxiosResponse<Type>>;

export type TRequestData = {
  action: string;
  params: {
    [key: string]: any;
  }
}