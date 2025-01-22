<script setup lang="ts">
import CartItem from '@/components/CartItem.vue'

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
    <CartItem
      :key="item.id"
      v-for="item in items"
      :id="item.id"
      :title="item.title"
      :image="item.image"
      :price="item.price"
      :rating="item.rating"
    />
  </transition-group>
</template>
<style>
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
