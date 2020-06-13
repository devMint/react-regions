export enum EventType {
  REGISTERED = 'region_registered',
  UNREGISTERED = 'region_unregistered',
}

export class Event {
  constructor(private readonly type: EventType, private readonly region: string) {}

  getType(): EventType {
    return this.type
  }

  getRegion(): string {
    return this.region
  }
}

export class RegionRegisteredEvent extends Event {
  constructor(region: string) {
    super(EventType.REGISTERED, region)
  }
}

export class RegionUnregisteredEvent extends Event {
  constructor(region: string) {
    super(EventType.UNREGISTERED, region)
  }
}
