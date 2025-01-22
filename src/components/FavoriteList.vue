<script setup lang="ts">
import FavoriteItem from '@/components/FavoriteItem.vue'

interface Product {
  id: number
  description: string
  category: string
  price: number
  image: string
  rating: { rate: number; count: number }
  title: string
}

interface Props {
  items: Product[]
}

defineProps<Props>()
</script>
<template>
  <transition-group name="list" tag="div">
    <FavoriteItem
      :key="item.id"
      v-for="item in items"
      :id="item.id"
      :rating="item.rating"
      :image="item.image"
      :price="item.price"
      :title="item.title"
      :description="item.description"
      :category="item.category"
    />
  </transition-group>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
