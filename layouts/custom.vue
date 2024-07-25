<template>
  <section class="h-screen flex flex-col ">
    <header class="bg-slate-600 min-h-16 flex justify-between items-center px-4">
      <div class="flex">
        <NuxtLink :to="{ name: 'index' }">
          <Icon name="ic:outline-arrow-back" class="size-6 bg-white mr-2 translate-y-0.5"></Icon>
        </NuxtLink>
        <h3 class="text-lg text-white">City management</h3>
      </div>
      <Icon name="ic:outline-delete" v-if="myCities.length" class="size-8 mr-2 bg-white cursor-pointer"  @click="handleDeleteClick"/>
    </header>
    <main class="px-5 pt-6">
      <slot></slot>
    </main>
  </section>
</template>

<script setup lang="ts">
const handleDeleteClick = () => {
  deleteButton.value = !deleteButton.value
}
</script>