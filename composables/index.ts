
export const getTemp = (city: number) => {
  return  (city).toString().slice(0, 2)
}

export const getIcon = (currentCity: CityWeather) => {
  return currentCity.weather[0].icon
}

export const getWeatherCity = async (lat: number, lon: number) => {
  try{
    const data: CityWeather = await $fetch(`${url}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    if(data){
      currentCity.value = data
      addCity(data)
      console.log(currentCity.value)
    }
  }catch(err){
    console.log(err)
  }
}

export const addCity = (city: CityWeather) => {
  myCities.value.push(city)
  watcher.value = false
}
