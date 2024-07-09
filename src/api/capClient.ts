import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { stringify } from 'qs';
import { toast } from 'react-toastify';
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
    return res.status >= 200 && res.status < 300;
  }

  public async getQuakes(filter: QuakeFilter): Promise<FeatureCollection | Error> {
    const { date, depth, magnitude } = filter;
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query`;
    try {
      const response = await this.axios.get<FeatureCollection>(url, {
        params: {
          format: 'geojson',
          starttime: date.min?.split('T')[0],
          endtime: date.max?.split('T')[0],
          mindepth: depth.min,
          maxdepth: depth.max,
          minmagnitude: magnitude.min,
          maxmagnitude: magnitude.max,
        }
      });
      if (this.wasSuccess(response)) {
        toast.success('Earthquake data fetched successfully!');
        return response.data;
      }
      toast.error(`Error: ${response.statusText}`);
      return new Error(response.statusText);
    } catch (e) {
      toast.error('Error fetching quakes');
      console.error('Error fetching quakes:', e);
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
        toast.success('Old earthquake data fetched successfully!');
        return response.data;
      }
      toast.error(`Error: ${response.statusText}`);
      return new Error(response.statusText);
    } catch (e) {
      toast.error('Error fetching old quakes');
      console.error('Error fetching old quakes:', e);
      return e as Error;
    }
  }

  public async getQuakesByLocation(
    latitude: number,
    longitude: number,
    maxradiuskm: number
  ): Promise<FeatureCollection | Error> {
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query`;
    try {
      const response = await this.axios.get<FeatureCollection>(url, {
        params: {
          format: 'geojson',
          latitude,
          longitude,
          maxradiuskm,
        },
      });
      if (this.wasSuccess(response)) {
        toast.success('Earthquake data by location fetched successfully!');
        return response.data;
      }
      toast.error(`Error: ${response.statusText}`);
      return new Error(response.statusText);
    } catch (e) {
      toast.error('Error fetching quakes by location');
      console.error('Error fetching quakes by location:', e);
      return e as Error;
    }
  }
}
