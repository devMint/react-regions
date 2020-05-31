export class CircularReferenceDetected extends Error {
  constructor(regionName: string) {
    super(`Circular reference detected for region "${regionName}".`)
  }
}
