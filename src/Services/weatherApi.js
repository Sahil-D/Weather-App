import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const OPEN_WEATHER_KEY = process.env.REACT_APP_OPEN_WEATHER_KEY;

const createRequest = (url) => ({ url });

const baseURI = 'https://api.openweathermap.org/data/2.5';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    getCityDetails: builder.query({
      query: (city) =>
        createRequest(
          `/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_KEY}`
        ),
    }),
  }),
});

export const { useGetCityDetailsQuery } = weatherApi;
