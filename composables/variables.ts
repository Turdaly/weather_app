export interface City {
  country: string
  lat: number,
  lon: number,
  name: string
  state: string
  local_names: Record<string, string>
}

export interface CityWeather {
  base: string,
  country: string,
  clouds: {all: number}
  code: number,
  coord: {lat: number, lon: number,}
  main: {temp: number, feels_like: number, temp_min: number, temp_max: number, pressure: number, humidity: number}
  name: string
  state: string
  weather: [{id: number, main: string, description: string, icon: string}],
  wind: {speed: number, deg: number}
}

interface ForecastList extends CityWeather {
  dt: number,
  dt_txt: Date
}
export interface Forecast {
  city: {id: number, name: string, coord: {lat: number, lon: number}, country: string}
  list: ForecastList[]
}
export const currentCity = ref<CityWeather>()
export const API_KEY = '916a39d373338e845094117e3444a02c'
export const url = 'https://api.openweathermap.org'
export const watcher = ref<boolean>(false)
export const myCities = ref<CityWeather[]>([])
export const deleteButton = ref<boolean>(false)