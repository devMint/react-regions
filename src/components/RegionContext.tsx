import * as React from 'react'
import { RegionRegistry } from '../registry/RegionRegistry'

export const RegionContext = React.createContext<RegionRegistry>(new RegionRegistry())
