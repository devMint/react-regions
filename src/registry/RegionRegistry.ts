import { ComponentType } from 'react'
import { RegionNotRegistered } from '../errors/RegionNotRegistered'
import { Event, RegionUnregisteredEvent, RegionRegisteredEvent } from './RegistryEvent'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReactComponent = ComponentType<any>
type ListenerCallback = (event: Event) => void
type RegionName = string | RegExp
type ListenerConfiguration = {
  listener: ListenerCallback
  region: RegionName
  token: string
}

export class RegionRegistry {
  private readonly regions: Record<string, ReactComponent> = {}
  private callbacks: ListenerConfiguration[]

  constructor() {
    this.regions = {}
    this.callbacks = []
  }

  register(region: string, component: ReactComponent): void {
    this.regions[region] = component
    const event = new RegionRegisteredEvent(region)

    this.getCallbacks(region).forEach(({ listener }) => {
      listener(event)
    })
  }

  unregister(region: string): void {
    delete this.regions[region]
    const event = new RegionUnregisteredEvent(region)

    this.getCallbacks(region).forEach(({ listener }) => {
      listener(event)
    })

    delete this.callbacks[region]
  }

  load(region: string): ReactComponent {
    if (false === region in this.regions) {
      throw new RegionNotRegistered(region)
    }

    return this.regions[region]
  }

  listen(region: RegionName, cb: ListenerCallback): () => void {
    const config: ListenerConfiguration = {
      token: `${region.toString()}-${Math.floor(Math.random() * 1000000)}`,
      listener: cb,
      region,
    }

    this.callbacks = [...this.callbacks, config]

    return () => {
      this.callbacks = this.callbacks.filter(({ token }) => token !== config.token)
    }
  }

  private getCallbacks(region: string): ListenerConfiguration[] {
    return this.callbacks.filter((config) => {
      return config.region instanceof RegExp ? config.region.test(region) : config.region === region
    })
  }
}
