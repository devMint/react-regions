import * as React from 'react'
import { RegionContext, RegionFragmentContext } from './RegionContext'
import { RegionFragment } from './RegionFragment'
import { CircularReferenceDetected } from '../errors/CircularReferenceDetected'

interface RegionProps {
  region: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any
}

export const Region = ({ region, ...rest }: RegionProps) => {
  const registry = React.useContext(RegionContext)
  const regionName = React.useContext(RegionFragmentContext)
  const [counter, update] = React.useState(0)

  React.useEffect(() => {
    return registry.listen(region, () => update(counter + 1))
  }, [region])

  try {
    const C = registry.load(region)
    if (region === regionName) {
      throw new CircularReferenceDetected(region)
    }

    return (
      <RegionFragment regionName={region}>
        <C {...rest} />
      </RegionFragment>
    )
  } catch (e) {
    return null
  }
}
