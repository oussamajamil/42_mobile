export const getWeatherDescription = (weatherCode: number) => {
  if (weatherCode === 0) return "Clear sky";
  if (weatherCode >= 1 && weatherCode <= 3) return "Mostly clear sky";
  if (weatherCode >= 45 && weatherCode <= 48) return "Fog";
  if (weatherCode >= 51 && weatherCode <= 55) return "drizzle";
  if (weatherCode >= 56 && weatherCode <= 57) return "Freezing drizzle";
  if (weatherCode >= 61 && weatherCode <= 65) return "Light rain";
  if (weatherCode >= 66 && weatherCode <= 67) return "Freezing rain";
  if (weatherCode >= 71 && weatherCode <= 75) return "Heavy rain";
  if (weatherCode >= 80 && weatherCode <= 85) return "Light snow";
  if (weatherCode >= 86 && weatherCode <= 87) return "Heavy snow";
  if (weatherCode >= 91 && weatherCode <= 95) return "Thunderstorm";
  if (weatherCode >= 96 && weatherCode <= 97) return "Light hail";
  if (weatherCode >= 98 && weatherCode <= 99) return "Heavy hail";
  return "Unknown";
  /// Weather codes are from https://open-meteo.com/
};

export const getWeatherImage = (
  weatherCode: number
):
  | "sunny.png"
  | "cloudy.png"
  | "rain-light.png"
  | "snowy.png"
  | "thunder.png"
  | "windy.png" => {
  if (weatherCode === 0) return "sunny.png";
  if (weatherCode >= 1 && weatherCode <= 3) return "cloudy.png";
  if (weatherCode >= 45 && weatherCode <= 48) return "cloudy.png";
  if (weatherCode >= 51 && weatherCode <= 55) return "rain-light.png";
  if (weatherCode >= 56 && weatherCode <= 57) return "rain-light.png";
  if (weatherCode >= 61 && weatherCode <= 65) return "rain-light.png";
  if (weatherCode >= 66 && weatherCode <= 67) return "rain-light.png";
  if (weatherCode >= 71 && weatherCode <= 75) return "rain-light.png";
  if (weatherCode >= 80 && weatherCode <= 85) return "snowy.png";
  if (weatherCode >= 86 && weatherCode <= 87) return "snowy.png";
  if (weatherCode >= 91 && weatherCode <= 95) return "thunder.png";
  if (weatherCode >= 96 && weatherCode <= 97) return "rain-light.png";
  if (weatherCode >= 98 && weatherCode <= 99) return "rain-light.png";
  return "windy.png";
};

export const getWeatherColor = (weatherCode: number) => {
  if (weatherCode === 0) return "#FFD700";
  if (weatherCode >= 1 && weatherCode <= 3) return "#B0C4DE";
  if (weatherCode >= 45 && weatherCode <= 48) return "#B0C4DE";
  if (weatherCode >= 51 && weatherCode <= 55) return "#87CEFA";
  if (weatherCode >= 56 && weatherCode <= 57) return "#87CEFA";
  if (weatherCode >= 61 && weatherCode <= 65) return "#87CEFA";
  if (weatherCode >= 66 && weatherCode <= 67) return "#87CEFA";
  if (weatherCode >= 71 && weatherCode <= 75) return "#87CEFA";
  if (weatherCode >= 80 && weatherCode <= 85) return "#FFFAFA";
  if (weatherCode >= 86 && weatherCode <= 87) return "#FFFAFA";
  if (weatherCode >= 91 && weatherCode <= 95) return "#FF6347";
  if (weatherCode >= 96 && weatherCode <= 97) return "#87CEFA";
  if (weatherCode >= 98 && weatherCode <= 99) return "#87CEFA";
  return "#FFD700";
};

export const getWeatherGradient = (weatherCode: number) => {
  if (weatherCode === 0)
    return {
      backgroundGradientFrom: "#FFD700",
      backgroundGradientTo: "#ff9d00",
    };
  if (weatherCode >= 1 && weatherCode <= 3)
    return {
      backgroundGradientFrom: "#B0C4DE",
      backgroundGradientTo: "#B0C4DE",
    };
  if (weatherCode >= 45 && weatherCode <= 48)
    return {
      backgroundGradientFrom: "#B0C4DE",
      backgroundGradientTo: "#B0C4DE",
    };
  if (weatherCode >= 51 && weatherCode <= 55)
    return {
      backgroundGradientFrom: "#87CEFA",
      backgroundGradientTo: "#87CEFA",
    };
  if (weatherCode >= 56 && weatherCode <= 57)
    return {
      backgroundGradientFrom: "#87CEFA",
      backgroundGradientTo: "#87CEFA",
    };
  if (weatherCode >= 61 && weatherCode <= 65)
    return {
      backgroundGradientFrom: "#87CEFA",
      backgroundGradientTo: "#87CEFA",
    };
  if (weatherCode >= 66 && weatherCode <= 67)
    return {
      backgroundGradientFrom: "#87CEFA",
      backgroundGradientTo: "#87CEFA",
    };
  if (weatherCode >= 71 && weatherCode <= 75)
    return {
      backgroundGradientFrom: "#87CEFA",
      backgroundGradientTo: "#87CEFA",
    };
  if (weatherCode >= 80 && weatherCode <= 85)
    return {
      backgroundGradientFrom: "#FFFAFA",
      backgroundGradientTo: "#FFFAFA",
    };
  if (weatherCode >= 86 && weatherCode <= 87)
    return {
      backgroundGradientFrom: "#FFFAFA",
      backgroundGradientTo: "#FFFAFA",
    };
  if (weatherCode >= 91 && weatherCode <= 95)
    return {
      backgroundGradientFrom: "#FF6347",
      backgroundGradientTo: "#FF6347",
    };
  if (weatherCode >= 96 && weatherCode <= 97)
    return {
      backgroundGradientFrom: "#87CEFA",
      backgroundGradientTo: "#87CEFA",
    };
  if (weatherCode >= 98 && weatherCode <= 99)
    return {
      backgroundGradientFrom: "#87CEFA",
      backgroundGradientTo: "#87CEFA",
    };
  return {
    backgroundGradientFrom: "#FFD700",
    backgroundGradientTo: "#ed7e00",
  };
};
