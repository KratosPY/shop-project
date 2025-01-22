import { defineStore } from 'pinia'
import axios from 'axios'

interface Product {
  id: number
  description: string
  category: string
  price: number
  image: string
  rating: { rate: number; count: number }
  title: string
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [] as Product[],
  }),
  actions: {
    async addToCart(productId: number) {
      try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/${productId}`)
        const isInArray = this.cart.find((item) => item.id === productId)
        if (!isInArray) {
          this.cart.push(data)
        } else {
          this.removeFromCart(productId)
        }
        console.log(this.cart)
      } catch (error) {
        console.log(error)
      }
    },
    removeFromCart(productId: number) {
      const index = this.cart.findIndex((item) => item.id === productId)
      if (index != -1) {
        this.cart.splice(index, 1)
      }
    },

    isInCart(productId: number): boolean {
      return this.cart.some((item) => item.id === productId)
    },
  },
  getters: {
    cartItemCount(): number {
      return this.cart.length
    },
    cartPriceCount(): number {
      return this.cart.reduce((a, b) => a + b.price, 0)
    },


  },
})
