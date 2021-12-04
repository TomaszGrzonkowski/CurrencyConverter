export interface CurrencyObject {
  currencyName: string;
  currencySymbol?: string;
  id: string;
}

export interface CurrenciesResponse {
  results: {
    [key: string]: CurrencyObject;
  };
}
