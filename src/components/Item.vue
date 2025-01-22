<script setup lang="ts">
import { useCartStore } from '@/stores/cart.ts'
import like1 from '@/svg/like-1.svg'
import like2 from '@/svg/like-2.svg'
import { useFavoriteStore } from '@/stores/favorite.ts'
import checked from '@/svg/checked.svg'
import cart from '@/svg/shopping-cart.png'

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
const isInFavorites = (productId: number) => {
  return favoriteStore.favorites.some((item) => item.id === productId)
}

const addToCartPinia = async (productId: number) => {
  await cartStore.addToCart(productId)
}
const addToFavoritePinia = async (productId: number) => {
  await favoriteStore.addToFavorites(productId)
}
defineProps<Product>()

const isInCartItem = (productId: number) => {
  return  cartStore.isInCart(productId);
}
</script>
<template>
  <div>
    <div
      class="ml-6 pr-6 h-full  relative border cursor-pointer rounded-xl shadow-xl transition hover:shadow-2xl hover:-translate-y-2"
    >
      <div class="ml-4">
        <img
          @click="addToFavoritePinia(id)"
          id="svg-like"
          class="absolute hover:scale-125 transition"
          :src="!isInFavorites(id) ? like1 : like2"
          alt="like"
        />
        <router-link
          :to="{
            path: `/product/${id}`,
            query: {
              id: id,
              price: price,
              title: title,
              image: image,
              description: description,
              category: category,
              rating: rating.rate,
            },
          }"
          ><img class="justify-self-center mt-4 min-h-56" :src="image" width="235" height="266" />
          <p class="mt-6 font-semibold italic text-center transition hover:text-yellow-500">
            {{ title }}
          </p>
        </router-link>
        <p class="flex items-center ml-1">
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
          <span class="ml-2">{{ rating.rate }}</span>
        </p>
        <p class="font-semibold">{{ price }} $</p>
      </div>
      <div
        @click="addToCartPinia(id)"
        class="flex transition hover:text-yellow-500 absolute bottom-2 right-4 justify-end text-center items-center"
      >
        <p class="mr-5 font-medium">Add to cart</p>
        <img
          class="w-6 h-6 object-contain transition-transform transition hover:scale-125"
          :src="isInCartItem(id) ? checked : cart"
          width="30"
          height="30"
        />
      </div>

    </div>
  </div>
</template>
<style scoped></style>
