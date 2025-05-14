import { defineStore } from 'pinia'
import { markRaw } from 'vue'  // Add this import
import { F1Api, type Driver, type Constructor, type Race } from '@/api/f1'
import { useErrorStore } from './error'

const CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存

export const useF1Store = defineStore('f1', {
  state: () => ({
    loading: {
      drivers: false,
      constructors: false,
      nextRace: false
    },
    drivers: [] as Driver[],
    constructors: [] as Constructor[],
    nextRace: null as Race | null,
    lastUpdated: null as Date | null,
    ws: null as WebSocket | null
  }),

  actions: {
    async fetchAllData() {
      const errorStore = useErrorStore()
      
      // 检查缓存是否有效
      if (this.lastUpdated && Date.now() - this.lastUpdated < CACHE_DURATION) {
        return
      }

      try {
        this.loading = { drivers: true, constructors: true, nextRace: true }
        
        const [driversRes, constructorsRes, nextRaceRes] = await Promise.all([
          F1Api.getDriverStandings(),
          F1Api.getConstructorStandings(),
          F1Api.getNextRace()
        ])

        this.drivers = driversRes.data
        this.constructors = constructorsRes.data
        this.nextRace = nextRaceRes.data
        this.lastUpdated = driversRes.timestamp

        // 缓存数据
        localStorage.setItem('f1-data', JSON.stringify({
          drivers: driversRes.data,
          constructors: constructorsRes.data,
          nextRace: nextRaceRes.data,
          timestamp: this.lastUpdated
        }))

      } catch (error) {
        errorStore.showError('Failed to fetch F1 data')
        console.error('F1 data fetch error:', error)
      } finally {
        this.loading = { drivers: false, constructors: false, nextRace: false }
      }
    },

    setupWebSocket() {
      if (this.ws) {
        this.ws.close()
      }

    //   this.ws = markRaw(new WebSocket('wss://your-f1-websocket-server.com'))
      
    //   this.ws.onmessage = this.handleWebSocketMessage
    //   this.ws.onerror = this.handleWebSocketError
    //   this.ws.onclose = this.handleWebSocketClose
    },

    handleWebSocketMessage(event: MessageEvent) {
      try {
        const data = JSON.parse(event.data)
        switch (data.type) {
          case 'DRIVER_UPDATE':
            this.updateDriver(data.payload)
            break
          case 'CONSTRUCTOR_UPDATE':
            this.updateConstructor(data.payload)
            break
          case 'RACE_UPDATE':
            this.updateRace(data.payload)
            break
        }
      } catch (error) {
        console.error('WebSocket message handling error:', error)
      }
    },

    handleWebSocketError(event: Event) {
      const errorStore = useErrorStore()
      errorStore.showError('Live updates connection failed')
      console.error('WebSocket error:', event)
      this.reconnectWebSocket()
    },

    handleWebSocketClose() {
      console.log('WebSocket connection closed')
      this.reconnectWebSocket()
    },

    reconnectWebSocket() {
    //   setTimeout(() => {
    //     console.log('Attempting to reconnect WebSocket...')
    //     this.setupWebSocket()
    //   }, 5000)
    }
  }
})
