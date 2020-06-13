import * as React from 'react'
import { RegionContext } from './RegionContext'
import { RegionRegistry } from '../registry/RegionRegistry'

interface RegionProviderProps {
  children: React.ReactNode
  registry: RegionRegistry
}

export function RegionProvider({ children, registry }: RegionProviderProps): JSX.Element {
  return <RegionContext.Provider value={registry}>{children}</RegionContext.Provider>
}
