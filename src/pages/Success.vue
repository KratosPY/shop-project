<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import {useRouter} from "vue-router";
import {useCartStore} from "@/stores/cart.ts";
import {useFavoriteStore} from "@/stores/favorite.ts";

const router = useRouter();
const countdown = ref(5)
let interval: number | undefined = undefined
const cartStore = useCartStore();
const favoriteStore = useFavoriteStore();

const startCountDown = () => {
  if (interval) clearInterval(interval)
  interval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(interval)
      cartStore.cart = [];
      favoriteStore.favorites = []
      router.push('/')
    }
  }, 1000)
}
onMounted(() => {
  startCountDown()
})
onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>
<template>
  <div class="text-center mt-24">
    <h1 class="text-4xl text-green-500">Success</h1>
    <p class="text-3xl text-gray-400">You will be redirected to homepage in {{ countdown }}</p>
  </div>
</template>
