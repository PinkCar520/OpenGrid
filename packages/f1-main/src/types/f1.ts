export interface Driver {
  driverId: string
  givenName: string
  familyName: string
  nationality: string
  constructor: string
  points: number
  wins: number
  position: number
}

export interface Constructor {
  constructorId: string
  name: string
  nationality: string
  points: number
  wins: number
  position: number
}

export interface Race {
  round: number
  raceName: string
  circuit: {
    circuitName: string
    location: {
      lat: number
      long: number
      locality: string
      country: string
    }
  }
  date: string
  time: string
}

export interface F1ApiResponse<T> {
  data: T
  timestamp: number
}
