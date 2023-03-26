import axios from "axios"; 

export async function get_city_weather(city_name: string) {
    let duration = 60 * 60 * 1000; // 1 hour in milliseconds
    const interval = setInterval(() => {
      // Get the current weather for the specified city
      const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city_name}`;
      axios.get(url)
        .then((response) => {
          const weather_data = response.data;
          console.log(`Weather for ${city_name}:`, weather_data);
        })
        .catch((error) => {
          console.error(`Error getting weather for ${city_name}:`, error);
        });
    }, 1 * 60 * 1000);
  
    // Stop the interval after the specified duration
    setTimeout(() => {
      clearInterval(interval);
      console.log('Done getting weather.');
    }, duration);
  }