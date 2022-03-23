import axios, { AxiosResponse } from "axios";
import config from "./config.json";

interface Params {
  [id: string]: string;
}

interface CatAPI {
  [id: string]: (
    url: string,
    params?: Params
  ) => Promise<AxiosResponse<any, any>>;
}

const catApi: CatAPI = {
  GET: (url: string, params?: Params) =>
    axios.get(`${config.CAT_API_URL}${url}`, {
      params,
      headers: {
        "x-api-key": config.CAT_API_KEY,
      },
    }),
};

export default catApi;
