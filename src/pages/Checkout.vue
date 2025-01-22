<script setup lang="ts">
import { useCartStore } from '@/stores/cart.ts'
import { ref } from 'vue'
import CheckoutDelivery from '@/components/CheckoutDelivery.vue'
import CheckoutPickup from '@/components/CheckoutPickup.vue'
import DeliveryType from '@/components/DeliveryType.vue'

const cartStore = useCartStore()
const delivery = ref(false)
const pickUp = ref(false)
const deliveryPrice = ref(0)

const handleDeliveryButton = () => {
  pickUp.value = false
  delivery.value = true
  deliveryPrice.value = 10
}
const handlePickupButton = () => {
  pickUp.value = true
  delivery.value = false
  deliveryPrice.value = 0
}

const totalPrice = () => {
  return cartStore.cartPriceCount
}
const totalQuantity = () => {
  return cartStore.cartItemCount
}
const deleteCart = (productId: number) => {
  cartStore.removeFromCart(productId)
}
const cart = cartStore.cart;

</script>
<template>
  <h1 class="mx-auto text-center text-4xl mb-3 font-semibold">Checkout</h1>
  <div v-if="cart.length !== 0">
    <div class="items-center container justify-center text-center border shadow-md">
      <!-- ITEMS TABLE -->
      <div>
        <div class="flex items-center text-center p-2">
          <table class="w-full">
            <thead>
            <tr>
              <th scope="col">Photo</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in cartStore.cart" :key="item.id">
              <td><img class="w-9 h-11 mt-2" :src="item.image" /></td>
              <td>
                <span class="ml-6">{{ item.title }}</span>
              </td>
              <td>
                <span class="ml-6">{{ item.category }}</span>
              </td>
              <td>
                <span class="ml-6">{{ item.price }} $</span>
              </td>
              <td class="text-center">
                <svg
                  @click="deleteCart(item.id)"
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
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <hr />
      </div>
      <div class="p-3 flex flex-col">
      <span class="flex self-end text-lg"
      ><span class="font-semibold mr-2">Total quantity:</span> {{ totalQuantity() }} pcs</span
      >
        <span class="flex self-end text-lg"
        ><span class="font-semibold mr-2">Total price:</span> {{ totalPrice() }} $</span
        >
        <span class="flex self-end text-lg" v-if="delivery"
        ><span class="font-semibold mr-2">Delivery price:</span>10 $</span
        >
        <span class="flex self-end text-lg" v-if="pickUp"
        ><span class="font-semibold mr-2">Delivery price:</span>Free</span
        >
        <span class="flex self-end text-lg"
        ><span class="font-semibold mr-2">Total:</span> {{ totalPrice() + deliveryPrice }} $</span
        >
      </div>
    </div>
    <!-- ITEMS TABLE -->
    <!-- DELIVERY TYPE -->
    <div class="border shadow-md container mt-16 justify-center items-center text-center">
      <DeliveryType
        @handle-delivery-button="handleDeliveryButton"
        @handle-pickup-button="handlePickupButton"
      />
    </div>
    <!-- DELIVERY TYPE -->
    <div class="border shadow-md container mt-16 justify-center items-center">
      <!-- PERSONAL DATA -->
      <h1 class="font-semibold text-3xl mb-4 text-center">Your personal data</h1>
      <CheckoutPickup  v-if="pickUp" />
      <CheckoutDelivery  v-if="delivery || (!delivery && !pickUp)" />

    </div>
    <!-- PERSONAL DATA -->
  </div>
  <div v-else class="flex flex-col items-center justify-center mt-14 text-center">
    <div>
      <img class=" mb-4" src="../svg/package-icon.png" alt="Empty Cart Icon" />
    </div>
    <h1 class="text-3xl text-gray-400">Your cart is empty, add something</h1>
  </div>

</template>
<style>
.container {
  width: 900px;
  margin-left: auto;
  margin-right: auto;
}
</style>
