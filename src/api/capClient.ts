import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { stringify } from 'qs';
import { QuakeFilter } from 'types/api/request';
import { FeatureCollection, Quake } from 'types/api/responses';

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

  public async getQuakes(filter: QuakeFilter): Promise<FeatureCollection | Error> {
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query`;
    try {
      const response = await this.axios.get<FeatureCollection>(url, {
        params: {
          format: `geojson`,
          starttime: (filter.date.min || "").split("T")[0],
          endtime: (filter.date.max || "").split("T")[0],
          mindepth: filter.depth.min,
          maxdepth: filter.depth.max,
          minmagnitude: filter.magnitude.min,
          maxmagnitude: filter.magnitude.max,
          //mincdi: filter.intensity.min,
          //maxcdi: filter.intensity.max,
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

  public async getQuakesOld(filter: QuakeFilter): Promise<Quake[] | Error> {
    const url = `/Quake`;
    console.log(filter);
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

  public async getQuakesByLocation(latitude: number, longitude: number, maxradiuskm: number): Promise<FeatureCollection | Error> {
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query`;
    try {
      const response = await this.axios.get<FeatureCollection>(url, {
        params: {
          format: 'geojson',
          latitude: latitude,
          longitude: longitude,
          maxradiuskm: maxradiuskm
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
