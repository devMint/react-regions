import * as React from 'react'
import { Region } from '../../src'

interface NestedComponentProps {
  regionName: string
}

export function NestedComponent({ regionName, ...props }: NestedComponentProps) {
  return (
    <>
      <p>Dolor sit amet</p>
      <Region region={regionName} regionName={regionName} {...props} />
    </>
  )
}

export default NestedComponent
