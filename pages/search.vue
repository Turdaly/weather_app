<template>
  <div class="h-full">
    <div class="flex flex-col gap-4 mt-12">
      <h1 class="text-3xl font-medium ">Weather</h1>
      <form class="flex items-center justify-between border border-gray-800 rounded-xl" @submit.prevent="getSearchCity" >
        <Icon name="material-symbols:search-rounded" size="22" class="mx-1 border text-gray-400"/>
        <input type="text" v-model.trim="search"  required placeholder="Search the city" class="py-1 text-lg rounded-xl focus:outline-none w-full">
        <Icon v-if="search" @click="search = ''" name="ic:baseline-cancel" size="20" class="bg-gray-400 mr-2 cursor-pointer"></Icon>
      </form>
      <div v-if="watcher" class="flex flex-col gap-4 bg-white shadow-xl w-full rounded-lg h-screen">
        <div v-for="city in searchCities" @click="getWeatherCity(city.lat, city.lon)" class="hover:bg-slate-100 cursor-pointer">
          <h3 class="text-lg p-4">{{ city.name }}, {{ city.state }} {{ city.country }}</h3>
        </div>
      </div>
      <div v-if="!watcher" class="flex flex-col gap-2" @click="goToPage">
        <div v-for="city in myCities" class="flex flex-col justify-between min-h-28 px-3  bg-gray-400 rounded-2xl">
          <div class="flex items-center justify-between p-2">
            <h1 class="text-2xl font-medium">{{ city.name }}</h1>
            <div>
              <h1 v-if="!deleteButton" class="text-5xl">{{ getTemp(city.main.temp) }}°</h1>
              <Icon v-if="deleteButton" name="material-symbols:close-small-outline" size="42" @click="deleteCity(city)"></Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'custom'
})


const router = useRouter();
const search = ref<string>('')
const searchCities = ref<City[]>([])
const getSearchCity = async () => {
  try {
    const data = await $fetch<City[]>(`${url}/geo/1.0/direct?q=${search.value}&limit=2&appid=${API_KEY}`)
    if(data){
      searchCities.value = data
      watcher.value = true
    }
    search.value = ''
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

const deleteCity = ((item: CityWeather) => {
  if(myCities.value.length){
    myCities.value = myCities.value.filter(city => city.name !== item.name);
  }
  deleteButton.value = false
});

const goToPage = () => {
  if(deleteButton.value === false){
    router.push({ name: 'index'})
  }
}


</script>