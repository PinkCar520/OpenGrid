import { defineStore } from 'pinia'

interface ErrorState {
  message: string
  type: 'error' | 'warning' | 'info'
  visible: boolean
}

export const useErrorStore = defineStore('error', {
  state: (): ErrorState => ({
    message: '',
    type: 'info',
    visible: false
  }),

  actions: {
    showError(message: string) {
      this.message = message
      this.type = 'error'
      this.visible = true
    },

    hideError() {
      this.visible = false
    }
  }
})
