import {defineStore} from "pinia";
import axios from "axios";

interface Product {
  id: number
  description: string
  category: string
  price: number
  image: string
  rating: { rate: number; count: number }
  title: string
}

export const useFavoriteStore = defineStore('favorite',{
  state: () => ({
    favorites: [] as Product[],
  }),
  actions: {
    async addToFavorites(productId: number) {
      try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/${productId}`)
        const isInArray = this.favorites.find((item) => item.id === productId)
        if (!isInArray) {
          this.favorites.push(data)
        } else {
          this.removeFromFavorites(productId)
        }
        console.log(this.favorites)
      } catch (error) {
        console.log(error)
      }
    },
    removeFromFavorites(productId: number) {
      const index = this.favorites.findIndex((item) => item.id === productId)
      if (index != -1) {
        this.favorites.splice(index, 1)
      }
    },

  },
  getters:{
    favoritesCount(): number {
      return this.favorites.length
    },
  }
})
