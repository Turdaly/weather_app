export default defineNuxtRouteMiddleware(() => {
  if(!currentCity.value || Object.keys(currentCity.value).length === 0) {
    return navigateTo('/search')
  }
})