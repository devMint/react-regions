import * as React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Region, RegionProvider, RegionRegistry } from '../../src'

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

  it('should allow to render dynamic component', () => {
    const asyncComponent = React.lazy(() => import('./ExampleComponent'))
    const registry = new RegionRegistry()
    registry.register('example', asyncComponent)

    const { getByText } = render(
      <RegionProvider registry={registry}>
        <Region region={'example'} />
      </RegionProvider>,
    )

    waitFor(() => getByText('Lorem ipsum'))
  })
})
