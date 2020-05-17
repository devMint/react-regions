import * as React from 'react'
import { RegionContext } from './RegionContext'

interface RegionProps {
  region: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any
}

export const Region = ({ region, ...rest }: RegionProps) => {
  const registry = React.useContext(RegionContext)
  const [counter, update] = React.useState(0)

  React.useEffect(() => {
    return registry.listen(region, () => update(counter + 1))
  }, [region])

  try {
    const C = registry.load(region)

    return <C {...rest} />
  } catch (e) {
    return null
  }
}
