import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    isAsideCollapsed: false
  }),
  actions: {
    toggleAside() {
      this.isAsideCollapsed = !this.isAsideCollapsed
    }
  }
})
