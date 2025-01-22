<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart.ts'
import { computed, onMounted, ref, watch } from 'vue'

import CartList from '@/components/CartList.vue'
import Modal from '@/components/UI/Modal.vue'
import { useIsOpenModal } from '@/stores/isOpenModalStore.ts'

interface Product {
  id: number
  description: string
  category: string
  price: number
  image: string
  rating: { rate: number; count: number }
  title: string
}

const isOpenModalStore = useIsOpenModal()
const route = useRoute()
const cartStore = useCartStore()
const isInCartItem = ref(false)
const isOpenCart = computed(() => isOpenModalStore.isOpenCart)
const cartCount = computed(() => cartStore.cartItemCount)
const cartItems = ref<Product[]>([])
const getItemsInCart = () => {
  cartItems.value = cartStore.cart
}
const addToCartPinia = (productId: number) => {
  isInCartItem.value = true
  cartStore.addToCart(productId)
}
const openCart = () => {
  getItemsInCart()
  isOpenModalStore.openModalCart();
}
const checkIfInCart = () => {
  const productId = Number(query.id)
  isInCartItem.value = cartStore.cart.some((item) => item.id === productId)
}
onMounted(() => {
  checkIfInCart()
})
watch(
  () => cartStore.cart,
  () => {
    checkIfInCart()
    cartItems.value = cartStore.cart
    console.log('Updated cart items in watch:', cartItems.value)
  },
  { deep: true },
)
const closeCart = () => {
  isOpenModalStore.closeModalCart()
}
const checkout = () => {
  isOpenModalStore.closeModalCart()
}
const query = route.query
defineProps<Product>()

const isOpenReqModal = () => {
  if (isOpenCartStore.isOpenCart) {
    return false
  }
  return false
}
</script>
<template>
  <div class="mt-16 m-40">
    <div class="border rounded-md shadow-lg flex">
      <img id="image" class="" :src="String(query.image)" />
      <div class="ml-20">
        <p class="font-semibold text-3xl mt-10">{{ query.title }}</p>
        <p class="flex items-center ml-1 mt-5">
          <svg
            width="15px"
            height="15px"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--twemoji"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              fill="#FFAC33"
              d="M27.287 34.627c-.404 0-.806-.124-1.152-.371L18 28.422l-8.135 5.834a1.97 1.97 0 0 1-2.312-.008a1.971 1.971 0 0 1-.721-2.194l3.034-9.792l-8.062-5.681a1.98 1.98 0 0 1-.708-2.203a1.978 1.978 0 0 1 1.866-1.363L12.947 13l3.179-9.549a1.976 1.976 0 0 1 3.749 0L23 13l10.036.015a1.975 1.975 0 0 1 1.159 3.566l-8.062 5.681l3.034 9.792a1.97 1.97 0 0 1-.72 2.194a1.957 1.957 0 0 1-1.16.379z"
            ></path>
          </svg>
          <span class="ml-2">{{ query.rating }}</span>
        </p>
        <p class="font-medium text-4xl mt-5">{{ query.price }} $</p>
        <div v-if="!isInCartItem">
          <button
            class="border rounded-md p-2 mt-7 bg-lime-500 hover:bg-green-500 transition text-white"
            @click="addToCartPinia(id)"
          >
            Add to cart
          </button>
        </div>

        <div v-else-if="isInCartItem">
          <button
            class="border rounded-md p-2 mt-7 bg-lime-500 hover:bg-green-500 transition text-white"
            @click="openCart"
          >
            Already in your cart
          </button>
        </div>
        <Modal v-if="isOpenCart">
          <h1 class="font-semibold text-2xl mb-5">Your cart</h1>
          <div v-if="cartCount === 0">
            <p>Cart is empty</p>
          </div>
          <div v-else>
            <CartList :items="cartItems" />
          </div>
          <button class="border rounded-xl mt-5 p-2" @click="closeCart">Continue shopping</button>
          <router-link
            :to="{
              path: '/checkout',
            }"
          >
            <button
              class="border text-white rounded-md mt-5 ml-5 p-2 bg-lime-500 hover:bg-green-500 transition"
              @click="checkout"
            >
              Checkout
            </button>
          </router-link>
        </Modal>

        <h1 class="font-semibold text-3xl mt-10">Description</h1>
        <p class="text-xl">{{ query.description }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
#image {
  max-height: 600px;
  max-width: 600px;
}
</style>
