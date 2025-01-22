<script setup lang="ts">
import { useCartStore } from '@/stores/cart.ts'
import { computed, ref } from 'vue'
import FavoriteList from '@/components/FavoriteList.vue'
import CartList from '@/components/CartList.vue'
import { useIsOpenModal } from '@/stores/isOpenModalStore.ts'
import { useFavoriteStore } from '@/stores/favorite.ts'
import Modal from '@/components/UI/Modal.vue'

interface Product {
  id: number
  description: string
  category: string
  price: number
  image: string
  rating: { rate: number; count: number }
  title: string
}

const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const isOpenModalStore = useIsOpenModal()
const getFavorites = () => {
  return favoriteStore.favoritesCount
}

const favoritesCount = computed(() => getFavorites())
const favoriteItems = ref<Product[]>([])
const cartItems = ref<Product[]>([])

const getItemsInFavorites = async () => {
  favoriteItems.value = favoriteStore.favorites
}
const getItemsInCart = async () => {
  cartItems.value = cartStore.cart
}
const checkout = () => {
  isOpenModalStore.closeModalCart()
}
const cartCount = computed(() => cartStore.cartItemCount)
const isOpenCart = computed(() => isOpenModalStore.isOpenCart)
const isOpenFavorite = computed(() => isOpenModalStore.isOpenFavorite)
const openFavorite = () => {
  getItemsInFavorites()
  isOpenModalStore.openModalFavorite()
}
const closeFavorite = () => {
  isOpenModalStore.closeModalFavorite()
}

const openCart = () => {
  getItemsInCart()
  isOpenModalStore.openModalCart()
}
const closeCart = () => {
  isOpenModalStore.closeModalCart()
}
</script>
<template>
  <header>
    <div class="flex w-full justify-between">
      <router-link to="/"
        ><img id="logo" class="ml-12 mt-6" src="../svg/logo.svg" alt="logo"
      /></router-link>
      <ul class="flex mr-96 mt-10">
        <li @click="getFavorites" class="flex mr-7">
          <!-- FAVORITES LOGIC -->
          <img class="cursor-pointer" @click="openFavorite" src="../svg/heart.svg" alt="heart" />
          <Modal v-if="isOpenFavorite">
            <h1 class="font-semibold text-2xl mb-5">Your likes</h1>
            <div v-if="favoritesCount !== 0">
              <FavoriteList :items="favoriteItems" />
            </div>
            <div v-else>
              <p>No likes yet</p>
            </div>
            <button class="border rounded-xl mt-5" @click="closeFavorite">Continue shopping</button>
          </Modal>
          <!-- FAVORITES LOGIC -->
          <p
            class="font-semibold flex bg-amber-300 border w-4 h-4 text-xs absolute justify-center ml-5 items-center text-center rounded-full"
            v-if="favoritesCount !== 0"
          >
            {{ favoritesCount }}
          </p>
        </li>
        <!-- CART LOGIC -->
        <li class="flex">
          <img class="cursor-pointer" @click="openCart" src="../svg/cart.svg" />
          <p
            class="font-semibold absolute flex bg-amber-300 text-xs border w-4 h-4 justify-center ml-5 items-center text-center rounded-full"
            v-if="cartCount !== 0"
          >
            {{ cartCount }}
          </p>

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

          <!-- CART LOGIC -->
        </li>
      </ul>
    </div>
  </header>
</template>
<style>
#logo {
  width: 160px;
  height: 64px;
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}
</style>
