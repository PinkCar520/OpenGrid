import { defineStore } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'
import {router} from '@/router'
import { events } from '../utils/events'
import i18n from '../locales'
import { closeSelectMicroTags } from '@/hooks/microAppHelpers'

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [] as RouteLocationNormalized[],
    currentTab: '',
    cachedTabs: new Set<string>()
  }),

  actions: {
    addCurrentTab(route: RouteLocationNormalized) {
      // 忽略登录页等特殊页面
      if (!route.meta?.requiresAuth) return

      const isExist = this.tabs.some(item => item.path === route.path)
      if (!isExist) {
        this.tabs.push(route)
      }
      this.currentTab = route.path
      this.saveTabs()
    },

    setCurrentTab(currentTab:string) {
      this.currentTab = currentTab
    },

    removeCurrentTab(targetPath: string) {
      const tabIndex = this.tabs.findIndex((tab) => tab.path === targetPath)
      if (tabIndex === -1) return

      if (this.currentTab === targetPath) {
        const nextTab = this.tabs[tabIndex - 1] || this.tabs[tabIndex + 1]
        this.currentTab = nextTab.path
        if (nextTab) {
          router.push(nextTab.path)
        }
      }
      // Remove the tab
      this.tabs.splice(tabIndex, 1)
      // this.tabs = this.tabs.filter((tab) => tab.path !== currentTab)
      closeSelectMicroTags(targetPath)
      this.saveTabs()
    },

    // 保存 tabs 到 localStorage
    saveTabs() {
      const tabsToSave = this.tabs.map(tab => ({
        path: tab.path,
        meta: tab.meta,
        name: tab.name
      }))
      localStorage.setItem('cachedTabs', JSON.stringify(tabsToSave))
    },

    // 从 localStorage 恢复 tabs
    restoreTabs() {
      try {
        const savedTabs = localStorage.getItem('cachedTabs')
        if (savedTabs) {
          const parsedTabs = JSON.parse(savedTabs)
          this.tabs = parsedTabs
          if (parsedTabs.length > 0) {
            this.currentTab = parsedTabs[parsedTabs.length - 1].path
          }
        }
      } catch (error) {
        console.warn('Failed to restore tabs:', error)
      }
    },

    // 清空所有标签
    clearTabs() {
      this.tabs = []
      this.currentTab = ''
      this.cachedTabs.clear()
      localStorage.removeItem('cachedTabs')
    }
  }
})
