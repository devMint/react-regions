export class RegionNotRegistered extends Error {
  constructor(region: string) {
    super(`Region ${region} is not registered in registry`)
  }
}
