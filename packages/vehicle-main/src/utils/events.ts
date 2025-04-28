type EventCallback = (detail: any) => void;

class EventManager {
  private static instance: EventManager;

  private constructor() {}

  static getInstance(): EventManager {
    if (!EventManager.instance) {
      EventManager.instance = new EventManager();
    }
    return EventManager.instance;
  }

  emit(eventName: string, detail: any = {}) {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
  }

  on(eventName: string, callback: EventCallback) {
    const handler = ((event: CustomEvent) => callback(event.detail)) as EventListener;
    window.addEventListener(eventName, handler);
    return () => this.off(eventName, handler);
  }

  off(eventName: string, handler: EventListener) {
    window.removeEventListener(eventName, handler);
  }
}

export const events = EventManager.getInstance();
