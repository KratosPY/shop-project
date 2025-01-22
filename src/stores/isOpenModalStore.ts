import {defineStore} from "pinia";

export const useIsOpenModal = defineStore('isOpenCart', {
  state: () => ({
    isOpenCart: false,
    isOpenFavorite:false
  }),
  actions: {
    openModalCart() {
      console.log('Open modal', this);
       this.isOpenCart = true;
    },
    closeModalCart() {
      this.isOpenCart = false;
    },
    openModalFavorite() {
      this.isOpenFavorite = true;
    },
    closeModalFavorite() {
      this.isOpenFavorite = false;
    }
  }
})
