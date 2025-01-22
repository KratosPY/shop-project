<script setup lang="ts">
import ListItem from '@/components/ListItem.vue'
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useProductStore } from '@/stores/product.ts'

interface Product {
  id: number
  description: string
  category: string
  price: number
  image: string
  rating: { rate: number; count: number }
  title: string
}

const items = ref<Product[]>([])
const productStore = useProductStore()
onMounted(async () => {
  await fetchItems()
})
watch(
  () => productStore.nProducts,
  async () => {
    await fetchItems()
  },
  { deep: true },
)
const fetchItems = async () => {
  try {
    const response = await axios.get<Product[]>(
      `https://fakestoreapi.com/products?limit=${productStore.nProducts}`,
    )
    items.value = response.data
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
const showMore = () => {
  return productStore.showMoreProducts()
}
const sortBy = ref('')

watch(sortBy, async () => {
  try {
    if (sortBy.value === 'all') {
      const response = await axios.get<Product[]>(
        `https://fakestoreapi.com/products?limit=${productStore.nProducts}`,
      )
      items.value = response.data
      return
    }
    const { data } = await axios.get(`https://fakestoreapi.com/products/category/${sortBy.value}`)
    items.value = data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>
<template>
  <ul class="flex gap-4 justify-end mt-8 mr-8 cursor-pointer">
    <li>
      <button class="transition focus:border-b-4 focus:border-yellow-500" @click="sortBy = 'all'">ALL</button>
    </li>
    <li>
      <button class="transition focus:border-b-4 focus:border-yellow-500" @click="sortBy = 'jewelery'">
        JEWELERY
      </button>
    </li>
    <li>
      <button class="transition focus:border-b-4 focus:border-yellow-500" @click="sortBy = 'electronics'">
        ELECTRONICS
      </button>
    </li>
    <li>
      <button class="transition focus:border-b-4 focus:border-yellow-500" @click="sortBy = 'men\'s clothing'">
        MEN'S CLOTHING
      </button>
    </li>
    <li>
      <button class="transition focus:border-b-4 focus:border-yellow-500" @click="sortBy = 'women\'s clothing'">
        WOMEN'S CLOTHING
      </button>
    </li>
  </ul>
  <ListItem :items="items" />
  <button
    class="flex justify-center mb-16 mt-16 mx-auto border rounded-md p-2 transition bg-yellow-500 hover:bg-yellow-400"
    @click="showMore"
  >
    {{ sortBy !== 'all' ? 'All' : 'Show more' }}
  </button>
</template>
