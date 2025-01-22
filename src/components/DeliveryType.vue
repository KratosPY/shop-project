<script setup lang="ts">

const emit = defineEmits<{
  (e: 'handlePickupButton') : void,
  (e: 'handleDeliveryButton') : void,
}>();
</script>
<template>
  <div class="">
    <h1 class="font-semibold text-4xl mb-4">Choose delivery</h1>
    <ul class="flex flex-row justify-center mb-2">
      <li>
        <button
          @click="emit('handlePickupButton')"
          class="w-32 p-4 border-2 hover:border-orange-300 transition rounded-md focus:border-orange-300"
        >
          Pickup
        </button>
      </li>
      <li class="ml-2">
        <button
          @click="emit('handleDeliveryButton')"
          class="w-32 p-4 border-2 hover:border-orange-300 transition rounded-md focus:border-orange-300"
        >
          Delivery
        </button>
      </li>
    </ul>
  </div>
</template>
