import * as React from 'react'
import { RegionRegistry, RegionNotRegistered, Event, EventType } from '../../src'

describe('RegionRegistry', () => {
  const ExampleComponent = () => <p>Test</p>

  it('should allow to register and load region', () => {
    const registry = new RegionRegistry()
    registry.register('header', ExampleComponent)

    expect(registry.load('header')).toBe(ExampleComponent)
  })

  it('should allow to attach listener to listen on changes', () => {
    const listener = jest.fn()
    const registry = new RegionRegistry()
    registry.listen('header', listener)
    registry.register('header', ExampleComponent)

    expect(listener).toHaveBeenCalled()
  })

  it('should allow to attach more than one listener', () => {
    const [listener1, listener2] = [jest.fn(), jest.fn()]
    const registry = new RegionRegistry()
    registry.listen('header', listener1)
    registry.listen('header', listener2)
    registry.register('header', ExampleComponent)

    expect(listener1).toHaveBeenCalled()
    expect(listener2).toHaveBeenCalled()
  })

  it('should allow to unregister regions', () => {
    const registry = new RegionRegistry()
    registry.register('header', ExampleComponent)
    registry.unregister('header')

    expect(() => registry.load('header')).toThrow(RegionNotRegistered)
  })

  it('should dispatch actions with event', (done) => {
    const listener = jest.fn().mockImplementationOnce((event: Event) => {
      expect(event.type).toEqual(EventType.REGISTERED)
      done()
    })

    const registry = new RegionRegistry()
    registry.listen('header', listener)
    registry.register('header', ExampleComponent)
  })

  it('should allow to unlisten on certain region', () => {
    const listener = jest.fn()
    const registry = new RegionRegistry()

    registry.register('header', ExampleComponent)
    const unlisten = registry.listen('header', listener)
    unlisten()
    registry.unregister('header')

    expect(listener).not.toBeCalled()
  })

  describe('event actions', () => {
    const registry = new RegionRegistry()
    registry.register('header', ExampleComponent)

    it('should dispatch event on "REGISTER" action', (done) => {
      const listener = jest.fn().mockImplementationOnce((event: Event) => {
        expect(event.type).toEqual(EventType.REGISTERED)
        expect(event.region).toEqual('header')
        done()
      })

      registry.listen('header', listener)
      registry.register('header', ExampleComponent)
    })

    it('should dispatch event on "UNREGISTER" action', (done) => {
      const listener = jest.fn().mockImplementation((event: Event) => {
        expect(event.type).toEqual(EventType.UNREGISTERED)
        expect(event.region).toEqual('header')
        done()
      })

      registry.listen('header', listener)
      registry.unregister('header')
    })
  })

  describe('dynamic region', () => {
    it('should allow to register dynamic component', () => {
      const asyncComponent = React.lazy(() => import('../components/ExampleComponent'))
      const registry = new RegionRegistry()
      registry.register('example', asyncComponent)

      expect(() => registry.load('example')).not.toThrow()
    })

    it('should allow to unregister dynamic component', () => {
      const asyncComponent = React.lazy(() => import('../components/ExampleComponent'))
      const registry = new RegionRegistry()
      registry.register('example', asyncComponent)
      registry.unregister('example')

      expect(() => registry.load('example')).toThrow(RegionNotRegistered)
    })
  })

  describe('support for regular expressions', () => {
    it('should listen for each event starting with "header-"', () => {
      const listener = jest.fn()
      const registry = new RegionRegistry()

      registry.listen(/^header-*/, listener)
      registry.register('header-test', ExampleComponent)

      expect(listener).toHaveBeenCalled()
    })

    it('should listen for each event', () => {
      const listener = jest.fn()
      const registry = new RegionRegistry()

      registry.listen(/([a-z1-9-_])+/, listener)
      registry.register('header', ExampleComponent)
      registry.register('footer-simple', ExampleComponent)
      registry.register('nothing1234', ExampleComponent)
      registry.register('CamelCase', ExampleComponent)

      expect(listener).toHaveBeenCalledTimes(4)
    })
  })
})
