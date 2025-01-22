<script setup lang="ts">

import Item from "@/components/Item.vue";

interface Product {
  id: number;
  description: string;
  category: string;
  price: number;
  image: string;
  rating: {rate: number, count: number};
  title: string;
}
interface Props{
  items: Product[];
}
defineProps<Props>()
</script>
<template>
  <div>
    <h1 class="ml-10 mt-10 mb-10 text-4xl font-semibold">Catalog</h1>
    <div v-auto-animate class="grid grid-cols-4 gap-6 mr-6">
      <Item
      v-for="item in items"
      :id="item.id"
      :title="item.title"
      :price="item.price"
      :category="item.category"
      :description="item.description"
      :image="item.image"
      :rating="item.rating"
      :key="item.id"
      />
    </div>
  </div>
</template>
