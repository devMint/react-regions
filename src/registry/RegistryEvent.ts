export enum EventType {
  REGISTERED = 'region_registered',
  UNREGISTERED = 'region_unregistered',
}

export class Event {
  type: EventType
  region: string

  constructor(type: EventType, region: string) {
    this.type = type
    this.region = region
  }
}
