import axios from "axios";
export const getCities = async (text: string) => {
  const result = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${text}`
  );
  return result?.data?.results;
};

export const getLocations = async (latitude: number, longitude: number) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;

  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = response.data;
    if (!data || data.error) {
      throw new Error(
        "Nominatim API error: " + (data.error || "Unknown error")
      );
    }

    const address = data.address;
    const location = {
      country: address.country,
      region: address?.state || address?.region || address?.county, // Nominatim might use different fields for region
      city: address?.city || address?.town || address?.village, // Nominatim might use different fields for city
    };

    return location;
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
};

export const getWeatherCurrent = async (
  latitude?: number,
  longitude?: number
) => {
  if (!latitude || !longitude) return null;
  const result = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  return result?.data;
};

export const getWeatherDay = async (latitude?: number, longitude?: number) => {
  const today = new Date().toISOString().split("T")[0];
  if (!latitude || !longitude) return null;
  const result = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&hourly=temperature_2m,weathercode,windspeed_10m&start=${today}T00:00:00Z&end=${today}T23:59:59`
  );
  return result?.data;
};

export const getWeatherWeek = async (latitude?: number, longitude?: number) => {
  if (!latitude || !longitude) return null;
  const result = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum`
  );
  return result?.data;
};
