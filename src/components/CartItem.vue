<script setup lang="ts">
import { useCartStore } from '@/stores/cart.ts'

interface Props {
  id: number
  image: string
  title: string
  price: number
  rating: { rate: number; count: number }
}

const cartStore = useCartStore()
const deleteCart = (productId: number) => {
  cartStore.removeFromCart(productId)
}
defineProps<Props>()
</script>
<template>
  <div class="flex flex-col justify-between h-full items-center border shadow-md mb-3">
    <div class="flex mb-5 w-full items-center">
      <img :src="image" width="40" height="40" alt="Product" />
      <div class="ml-8">
        <div>{{ title }}</div>
        <div class="flex mt-2 items-center">
          <!-- Рейтинг -->
          <p class="flex items-center">
            <svg
              width="15px"
              height="15px"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
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
          <p class="ml-4 font-semibold">{{ price }} $</p>
        </div>
      </div>
    </div>
    <svg
      @click="deleteCart(id)"
      class="cursor-pointer self-end mb-3 mr-3 icon transition"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="4 3 40 40"
      role="presentation"
      data-v-26d146cd=""
      data-v-33ea1698=""
    >
      <g class="" fill="gray" data-v-26d146cd="">
        <g data-v-26d146cd-s="" data-v-33ea1698-s="">
          <path
            d="M13.05 42q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"
          ></path>
        </g>
      </g>
    </svg>
  </div>
</template>
