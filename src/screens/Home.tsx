import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CurrenciesApi } from "../api/api";
import { CurrencyObject } from "../models/CurrenciesResponse.interface";
import { ConversionObj } from "../models/ConversionObj.interface";

type FormData = {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
};

const validationSchema = Yup.object({
  fromCurrency: Yup.string().required("The currency name is required"),
  toCurrency: Yup.string().required("The currency name is required"),
  amount: Yup.number()
    .min(1, "Minimum value is 1")
    .required("Amount is required"),
});

const Home: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const [currenciesList, setCurrenciesList] = useState<CurrencyObject[] | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(validationSchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await CurrenciesApi.getConversion(
        data.fromCurrency,
        data.toCurrency
      );

      if (response) {
        const objToSave = {
          from: data.fromCurrency,
          to: data.toCurrency,
          conversion: Object.values(response)[0],
          amount: data.amount,
          date: new Date().toDateString(),
        };

        saveItem("conversions", objToSave);
        navigate("/history");
      }
    } catch (err) {
      console.log(err);
    }
  });

  const saveItem = (storeName: string, body: ConversionObj): void => {
    const items = localStorage.getItem(storeName);
    if (items === null) {
      localStorage.setItem(storeName, JSON.stringify([body]));
    } else {
      const newItems = [...JSON.parse(items), body];
      localStorage.setItem(storeName, JSON.stringify(newItems));
    }
  };

  const fetchCurrencies = async () => {
    const { results } = await CurrenciesApi.getAllCurrencies();
    if (results) {
      setCurrenciesList(
        Object.values(results).sort((a, b) =>
          a.currencyName.localeCompare(b.currencyName)
        )
      );
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  if (!currenciesList) {
    return <p>...Loading</p>;
  }

  return (
    <div className="contentWrapper">
      <form onSubmit={onSubmit}>
        <div className="column">
          <label className="label">Amount:</label>
          <input
            className="input"
            type="number"
            {...register("amount")}
            placeholder="Enter amount"
          />
          <p className="text_error">{errors.amount?.message}</p>
        </div>
        <div className="column">
          <label className="label">From:</label>
          <select {...register("fromCurrency")} className="input">
            {currenciesList.map((el: CurrencyObject) => (
              <option key={el.id} value={el.id}>
                {el.currencyName}
              </option>
            ))}
          </select>
          <p className="text_error">{errors.fromCurrency?.message}</p>
        </div>
        <div className="column">
          <label className="label">To:</label>
          <select {...register("toCurrency")} className="input">
            {currenciesList.sort().map((el: CurrencyObject) => (
              <option key={el.id} value={el.id}>
                {el.currencyName}
              </option>
            ))}
          </select>
          <p className="text_error">{errors.toCurrency?.message}</p>
        </div>
        <button className="button" type="submit">
          Convert
        </button>
      </form>
    </div>
  );
};

export default Home;
