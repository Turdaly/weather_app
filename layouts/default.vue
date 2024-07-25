<template>
  <section v-if="currentCity" class="h-screen flex flex-col">
    <header class="bg-slate-600 min-h-16 flex justify-between items-center px-4">
      <h3 class="text-xl text-white">{{ currentCity.name }}</h3>
      <NuxtLink :to="{ name: 'search'}">
        <Icon name="ic:baseline-location-city" class="size-8 mr-2 bg-white cursor-pointer"/>
      </NuxtLink>
    </header>
    <main class="px-5 pt-6">
      <slot></slot>
    </main>
  </section>
</template>

<script setup lang="ts">

</script>