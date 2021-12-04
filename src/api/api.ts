import axios, { AxiosResponse } from "axios";
import { ConversionResponse } from "../models/ConversionResponse.interface";
import { CurrenciesResponse } from "../models/CurrenciesResponse.interface";

const instance = axios.create({
  baseURL: "https://free.currconv.com/api/v7/",
  timeout: 15000,
  params: {
    apiKey: "35183612485f44be69d6",
  },
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
};

export const CurrenciesApi = {
  getAllCurrencies: (): Promise<CurrenciesResponse> =>
    requests.get("currencies"),
  getConversion: (from: string, to: string): Promise<ConversionResponse> =>
    requests.get(`convert?q=${from}_${to}&compact=ultra`),
};
