<template>
  <div v-if="currentCity" class="flex flex-col justify-between">
    <main>
      <div class="flex flex-col items-center mb-8">
        <h1 class="text-8xl font-thin">{{ getTemp(currentCity.main.temp) }}°</h1>
        <h3 class="text-xl mr-4">{{ currentCity.weather[0].description }}, humidity: {{ currentCity.main.humidity }}°</h3>
      </div>
      <div v-if="currentCityForecast" class="border rounded-xl px-4 py-3 mb-2">
        <p>Weather for hour</p>
        <div class="border-t border-slate-700 mt-4">
          <div class="flex gap-8 overflow-y-auto">
            <div v-for="city in currentCityForecast.list.slice(1, 10)" :key="city.dt" class="flex flex-col gap-4 mt-2 items-center ">
              <p class="font-medium">{{ city.dt_txt.toString().slice(11, 16) }}</p>
              <img src="/icon.svg" alt="" class="w-10">
              <p class="text-xl">{{ getTemp(city.main.temp) }}°</p>
            </div>
          </div>
        </div>
      </div>
      <div class="border rounded-xl px-4 py-3">
        <div class="flex items-center">
          <Icon name="material-symbols:calendar-month" color="black" class="mr-1"/>
          <p>10-DAY FORECAST</p>
        </div>
        <div class="flex flex-col border-t border-slate-700 overflow-x-auto max-h-48">
          <div v-for="_ in 5" class="flex items-center justify-between">
            <div class="flex justify-between my-2 items-center min-w-28">
              <p class="text-2xl font-medium">Today</p>
              <Icon :name="weatherIcons[getIcon(currentCity)].icon" :class="weatherIcons[getIcon(currentCity)].color" class="translate-y-0.5" size="28"/>
            </div>
            <p class="text-2xl">{{ getTemp(currentCity.main.temp_min) }}°</p>
            <img src="/group.png" alt="">
            <p class="text-2xl">{{ getTemp(currentCity.main.temp_max) }}°</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['check-city']
})
interface IWeatherIcon {
  icon: string,
  color: string
}

interface IWeatherIcons {
  [key: string]: IWeatherIcon
}

const weatherIcons: IWeatherIcons = {
  '01n': {icon: 'wi:moon-waning-crescent-3', color: ''},
  '01d': {icon: 'material-symbols:sunny-rounded', color: 'bg-yellow-300'},
  '02d': {icon: 'wi:day-cloudy', color: ''},
  '02n': {icon: 'wi:night-cloudy', color: ''},
  '03d': {icon: 'wi:cloud', color: ''},
  '03n': {icon: 'wi:cloud', color: ''},
  '04d': {icon: 'wi:cloudy', color: ''},
  '04n': {icon: 'wi:cloudy', color: ''},
  '09d': {icon: 'wi:rain-mix', color: ''},
  '09n': {icon: 'wi:rain-mix', color: ''},
  '10d': {icon: 'wi:day-rain-mix', color: ''},
  '10n': {icon: 'wi:day-rain-mix', color: ''},
  '11d': {icon: 'wi:storm-showers', color: ''},
  '11n': {icon: 'wi:storm-showers', color: ''},
  '13d': {icon: 'wi:snowflake-cold', color: ''},
  '13n': {icon: 'wi:snowflake-cold', color: ''},
  '50d': {icon: 'wi:dust', color: ''},
  '50n': {icon: 'wi:dust', color: ''},
}


const currentCityForecast = ref<Forecast>()
const getForecastCity = async (lat: number, lon: number) => {
  try{
    const data: Forecast = await $fetch(`${url}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    if(data){
      currentCityForecast.value = data
      console.log('forecast', currentCityForecast.value)
    }
  }catch(err){
    console.log(err)
  }
}
onMounted(async () => {
  if(currentCity.value) {
    await getForecastCity(currentCity.value.coord.lat, currentCity.value.coord.lon)
  }
})
</script>
