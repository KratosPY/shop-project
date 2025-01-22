<script setup lang="ts">
import {useFavoriteStore} from "@/stores/favorite.ts";
import {useIsOpenModal} from "@/stores/isOpenModalStore.ts";

interface Props {
  id: number
  description: string
  category: string
  price: number
  image: string
  rating: { rate: number; count: number }
  title: string
}

const favoriteStore = useFavoriteStore()
const deleteFavorite = (productId: number) => {
  favoriteStore.removeFromFavorites(productId)
}
const isOpenFavorite = useIsOpenModal();
const closeModal = () => {
  isOpenFavorite.closeModalFavorite();
}
defineProps<Props>()
</script>
<template>
    <div class="border shadow-md mb-2">
      <div class="flex ">
        <img :src="image" width="40" height="40" />
        <div class="ml-8">
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
          >
          <div @click="closeModal" class="font-semibold italic text-center transition hover:text-yellow-500">{{ title }}</div>
          </router-link>
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
        @click="deleteFavorite(id)"
        class="justify-self-end cursor-pointer icon transition mr-10 mb-3"
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
