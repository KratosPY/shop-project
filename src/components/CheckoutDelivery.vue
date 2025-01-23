<script setup lang="ts">
import {useRouter} from "vue-router";
import {type Ref, ref} from "vue";

const router = useRouter();
const onClickSubmit = () => {
  errors.value = [];
  if (fullName.value.length <= 2) {
    if (!errors.value.includes('Name cannot be less or equal than 2 letters')) {
      errors.value.push('Name cannot be less or equal than 2 letters')
    }
    return false;
  }
  if (phone.value.toString().length <= 9 || phone.value.toString().length >= 21) {
    if (!errors.value.includes('Phone number digits range is 10-20')) {
      errors.value.push('Phone number digits range is 10-20')
    }
    return false;
  }

  router.push('/success')
}
const fullName = ref('');
const phone = ref<number | undefined>(undefined);
const errors: Ref = ref([]);
</script>
<template>
  <div class="justify-start flex flex-col max-w-96 ml-2 pb-16">
    <div class="flex flex-col gap-1 ml-2">
      <div v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" :key="error.id"><span class="text-red-700">{{ error }}</span></li>
        </ul>
      </div>
      <label for="fullName" class="text-lg">Full name<span class="text-red-700">*</span></label>
      <input
        id="fullName"
        name="fullName"
        min="2"
        v-model="fullName"
        placeholder="Full name"
        class="outline-none border rounded-lg p-2"
      />
    </div>
    <div class="flex flex-col gap-1 ml-2 mt-3">
      <label for="Phone" class="text-lg">Phone<span class="text-red-700">*</span></label>
      <input
        id="phone"
        name="phone"
        v-model="phone"
        min="10"
        max="20"
        type="tel"
        placeholder="Your cell phone"
        class="outline-none border rounded-lg p-2"
      />
    </div>
    <div class="flex flex-col gap-1 ml-2 mt-3">
      <label for="e-mail" class="text-lg">E-mail</label>
      <input
        id="e-mail"
        name="e-mail"
        placeholder="Your e-mail"
        class="outline-none border rounded-lg p-2"
      />
    </div>
    <div class="flex flex-col gap-1 ml-2 mt-3">
      <label for="deliveryRegion" class="text-lg">Delivery region</label>
      <input
        id="deliveryRegion"
        name="deliveryRegion"
        placeholder="Delivery city and country"
        class="outline-none border rounded-lg p-2"
      />
    </div>
    <div class="flex flex-col gap-1 ml-2 mt-3">
      <label for="deliveryAddress" class="text-lg">Delivery address</label>
      <input
        id="deliveryAddress"
        name="deliveryAddress"
        placeholder="Delivery address"
        class="outline-none border rounded-lg p-2"
      />
    </div>
    <div class="flex flex-col gap-1 ml-2 mt-3">
      <label for="comment" class="text-lgl">Comment</label>
      <input
        id="comment"
        name="comment"
        placeholder="Comment"
        class="outline-none border rounded-lg p-2"
      />
    </div>
    <div
      class="mt-8 "
    >
      <button
        class="bg-lime-500 cursor-pointer transition hover:bg-green-500 w-full border rounded-md ml-2 mt-8 p-2 text-center text-white"
        @click="onClickSubmit">Submit
      </button>
    </div>
  </div>
</template>
<style>
.btnSubmit {
  width: 300px;
  height: 100px;
}
</style>
