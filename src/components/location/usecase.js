import axios from 'axios';
import { StatusCodes } from "http-status-codes";
import NodeCache from "node-cache";

export class LocationService {

  constructor() {
    const cache = new NodeCache();
    this.cache = cache;
  }

  async getCity() {
    const city = this.cache.get('city');
    let response = "";
    if (city === undefined) {
      const { data } = await axios.get('https://thongtindoanhnghiep.co/api/city');
      response = data.LtsItem.map(item => {
        return {
          id: item.ID,
          title: item.Title,
        }
      })
      this.cache.set('city', response)
    } else {
      response = city;
    }
    
    return {
      data: response,
      code: StatusCodes.OK
    }
  }

  async getProvinceByCityId(cityId) {
    const province = this.cache.get(`province-by-city-${cityId}`);
    let response = "";
    if (province === undefined) {
      const { data } = await axios.get(`https://thongtindoanhnghiep.co/api/city/${cityId}/district`);
      response = data.map(item => {
        return {
          id: item.ID,
          title: item.Title,
        }
      })
      this.cache.set(`province-by-city-${cityId}`);
    } else {
      response = province;
    }
    
    return {
      data: response,
      code: StatusCodes.OK
    }
  }

  async getWardByProvinceId(provinceId) {
    const { data } = await axios.get(`https://thongtindoanhnghiep.co/api/district/${provinceId}/ward`);
    const response = data.map(item => {
      return {
        id: item.ID,
        title: item.Title,
      }
    })
    return {
      data: response,
      code: StatusCodes.OK
    }
  }
}
