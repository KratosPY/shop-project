import {defineStore} from "pinia";



export const useProductStore = defineStore('product',{
  state: () => ({
    nProducts: 4,
  }),
  actions: {
    showMoreProducts() {
      this.nProducts += 4
    },
  },
  getters:{
    nProductCount(): number {
      return this.nProducts
    },
  }
})
