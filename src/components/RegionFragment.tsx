import * as React from 'react'
import { RegionFragmentContext } from './RegionContext'

interface RegionFragmentProps {
  children: React.ReactNode
  regionName: string
}

export function RegionFragment({ children, regionName }: RegionFragmentProps) {
  return (
    <RegionFragmentContext.Provider value={regionName}>{children}</RegionFragmentContext.Provider>
  )
}
