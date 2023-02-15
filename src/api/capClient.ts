import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { stringify } from 'qs';
import { QuakeFilter } from 'types/api/request';
import { Quake } from 'types/api/responses';

export class CapClient {
  private readonly baseUrl = import.meta.env.VITE_API_BASE_URL;
  private readonly axios: AxiosInstance;

  constructor(private readonly token: string) {
    this.axios = axios.create({
      baseURL: this.baseUrl,
      paramsSerializer: {
        serialize: (params) =>
          stringify(params, {
            skipNulls: true,
            allowDots: true
          })
      },
      headers: {
        'CAP-API-KEY': this.token
      }
    });
  }

  private wasSuccess(res: AxiosResponse<unknown>): boolean {
    return res.status >= 200 && res.status <= 300;
  }

  public async getQuakes(filter: QuakeFilter): Promise<Quake[] | Error> {
    const url = `/Quake`;
    try {
      const response = await this.axios.get<Quake[]>(url, {
        params: {
          page: 0,
          size: 0,
          ...filter
        }
      });
      if (this.wasSuccess(response)) {
        return response.data;
      }
      return new Error(response.statusText);
    } catch (e) {
      return e as Error;
    }
  }
}
