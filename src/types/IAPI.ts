import { AxiosResponse } from 'axios';

export type IAPIResponse<Type> = Promise<AxiosResponse<Type>>;

export type IRequestData = {
  action: string;
  params: {
    [key: string]: any;
  }
}