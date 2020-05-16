import { ComponentType } from 'react'
import { RegionNotRegistered } from '../errors/RegionNotRegistered'
import { Event, EventType } from './RegistryEvent'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReactComponent = ComponentType<any>
type ListenerCallback = (event: Event) => void

export class RegionRegistry {
  private readonly regions: Record<string, ReactComponent> = {}
  private readonly callbacks: Record<string, Record<string, ListenerCallback>> = {}

  register(region: string, component: ReactComponent): void {
    this.regions[region] = component

    if (region in this.callbacks) {
      const event = new Event(EventType.REGISTERED, region)
      Object.keys(this.callbacks[region]).forEach((key) => {
        this.callbacks[region][key](event)
      })
    }
  }

  unregister(region: string): void {
    delete this.regions[region]

    if (region in this.callbacks) {
      const event = new Event(EventType.UNREGISTERED, region)
      Object.keys(this.callbacks[region]).forEach((key) => {
        this.callbacks[region][key](event)
      })
    }

    delete this.callbacks[region]
  }

  load(region: string): ReactComponent {
    if (false === region in this.regions) {
      throw new RegionNotRegistered(region)
    }

    return this.regions[region]
  }

  listen(region: string, cb: ListenerCallback): () => void {
    const token = `${region}-${Math.floor(Math.random() * 1000000)}`
    if (false === region in this.callbacks) {
      this.callbacks[region] = {}
    }

    this.callbacks[region][token] = cb

    return () => delete this.callbacks[region][token]
  }
}
