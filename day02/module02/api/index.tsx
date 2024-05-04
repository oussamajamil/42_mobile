import axios from "axios";

export const getCities = async (text: string) => {
  const result = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${text}`
  );
  return result?.data?.results;
};


export const getLocations = async (latitude: number, longitude: number) => {
  try{
  if (!latitude || !longitude) return null;
  const result = await axios.get(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  )
  console.log({result:JSON.parse(JSON.stringify(result))});
  return result?.data;
  }
  catch(e){
    console.log({e});
  }
}


export const getWeatherCurrent = async (latitude?: number, longitude?: number) => {
  try{
  if (!latitude || !longitude) return null;
  const result = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  return result?.data;
  }
  catch(e){
    throw new Error("An error occurred");
  }
}