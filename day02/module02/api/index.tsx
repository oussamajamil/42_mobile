import axios from "axios";

export const getCities = async (text: string) => {
  const result = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${text}`
  );
  return result?.data?.results;
};
