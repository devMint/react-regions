import * as React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Region, RegionProvider, RegionRegistry } from '../../src'
import NestedComponent from './NestedComponent'

describe('RegionProvider and Region', () => {
  it('should render registered region', () => {
    const registry = new RegionRegistry()
    registry.register('header', () => <p>Lorem ipsum</p>)

    const { getByText } = render(
      <RegionProvider registry={registry}>
        <Region region={'header'} />
      </RegionProvider>,
    )

    expect(() => getByText('Lorem ipsum')).not.toThrow()
  })

  it('should allow to dynamically change registered regions', () => {
    const registry = new RegionRegistry()
    registry.register('header', () => <p>Lorem ipsum</p>)

    const onClick = jest.fn().mockImplementationOnce(() => {
      registry.register('header', () => <p>Dolor sit amet</p>)
    })

    const { getByText } = render(
      <RegionProvider registry={registry}>
        <Region region={'header'} />
        <a onClick={onClick}>Click</a>
      </RegionProvider>,
    )

    expect(() => getByText('Lorem ipsum')).not.toThrow()
    fireEvent.click(getByText('Click'))
    expect(onClick).toHaveBeenCalled()
    expect(() => getByText('Lorem ipsum')).toThrow()
    expect(() => getByText('Dolor sit amet')).not.toThrow()
  })

  it('should allow to dynamically pass props to component in region', () => {
    const registry = new RegionRegistry()
    registry.register('header', ({ text }: { text: string }) => <p>{text}</p>)

    const { getByText } = render(
      <RegionProvider registry={registry}>
        <Region region={'header'} text={'Lorem ipsum'} />
      </RegionProvider>,
    )

    expect(() => getByText('Lorem ipsum')).not.toThrow()
  })

  it('should render nothing when required region does not exists', () => {
    render(
      <RegionProvider registry={new RegionRegistry()}>
        <Region region={'header'} />
      </RegionProvider>,
    )
  })

  describe('asynchronous loading', () => {
    it('should allow to render dynamic component', () => {
      const AsyncComponent = React.lazy(() => import('./ExampleComponent'))
      const suspenseWrapper = () => (
        <React.Suspense fallback={'...'}>
          <AsyncComponent />
        </React.Suspense>
      )
      const registry = new RegionRegistry()
      registry.register('example', suspenseWrapper)

      const { getByText } = render(
        <RegionProvider registry={registry}>
          <Region region={'example'} />
        </RegionProvider>,
      )

      waitFor(() => getByText('Lorem ipsum'))
    })

    it('should allow to pass props to dynamic component', () => {
      const AsyncComponent = React.lazy(() => import('./ExampleComponent'))
      const suspenseWrapper = ({ title }: { title: string }) => (
        <React.Suspense fallback={'...'}>
          <p>{title}</p>
          <AsyncComponent />
        </React.Suspense>
      )
      const registry = new RegionRegistry()
      registry.register('example', suspenseWrapper)

      const { getByText } = render(
        <RegionProvider registry={registry}>
          <Region region={'example'} title={'Dolor sit amet'} />
        </RegionProvider>,
      )

      waitFor(() => getByText('Dolor sit amet'))
    })
  })

  describe('nesting regions', () => {
    it('should allow to render nested regions', () => {
      const registry = new RegionRegistry()
      registry.register('lorem', NestedComponent)
      registry.register('ipsum', () => <p>Random text</p>)

      const { getByText } = render(
        <RegionProvider registry={registry}>
          <Region region={'lorem'} regionName={'ipsum'} />
        </RegionProvider>,
      )

      expect(() => getByText('Random text')).not.toThrow()
    })

    it('should prevent circular reference of loading region in same region', () => {
      const registry = new RegionRegistry()
      registry.register('lorem', NestedComponent)

      const { getAllByText } = render(
        <RegionProvider registry={registry}>
          <Region region={'lorem'} regionName={'lorem'} />
        </RegionProvider>,
      )

      expect(getAllByText('Dolor sit amet')).toHaveLength(1)
    })
  })
})
