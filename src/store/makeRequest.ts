import axios, { AxiosRequestConfig } from 'axios';
import md5 from 'md5';

import { getUTCDate } from 'hooks/getUTCDate';
import { TAPIResponse, TRequestData } from 'types/TAPI';

const makeRequest = <Type>({
  method = 'POST',
  data,
}: AxiosRequestConfig<TRequestData>): TAPIResponse<Type> => {
  const url = 'https://api.valantis.store:41000/';

  const headers = {
    'X-Auth': md5(`Valantis_${getUTCDate()}`),
  };

  return axios.request<Type>({
    url,
    method,
    headers,
    data,
  });
};

export default makeRequest;
