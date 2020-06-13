import { Event, EventType, RegionRegisteredEvent, RegionUnregisteredEvent } from '../../src'

describe('RegistryEvent', () => {
  it('should allow to read type of event', () => {
    const event = new Event(EventType.REGISTERED, 'xkcd')
    expect(event.getType()).toEqual(EventType.REGISTERED)
  })

  it('should allow to read region of event', () => {
    const event = new Event(EventType.REGISTERED, 'xkcd')
    expect(event.getRegion()).toEqual('xkcd')
  })

  describe('RegionRegisteredEvent', () => {
    it('should have type of "region_registered"', () => {
      const event = new RegionRegisteredEvent('xkcd')
      expect(event.getType()).toEqual(EventType.REGISTERED)
      expect(event.getRegion()).toEqual('xkcd')
    })
  })

  describe('RegionUnregisteredEvent', () => {
    it('should have type of "region_unregistered"', () => {
      const event = new RegionUnregisteredEvent('xkcd')
      expect(event.getType()).toEqual(EventType.UNREGISTERED)
      expect(event.getRegion()).toEqual('xkcd')
    })
  })
})
