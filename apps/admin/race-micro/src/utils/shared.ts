export function assertShared(): void {
    if (!window.$root) {
      throw new Error('主应用共享实例未初始化')
    }
  }
  
  export function getShared() {
    assertShared()
    return window.$root!
  }