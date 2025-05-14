import axios from 'axios'
import type { Driver, Constructor, Race, F1ApiResponse } from '@/types/f1'

const BASE_URL = 'http://ergast.com/api/f1/2024'

export class F1Api {
  static async getDriverStandings(): Promise<F1ApiResponse<Driver[]>> {
    const { data } = await axios.get(`${BASE_URL}/driverStandings.json`)
    return {
      data: data.MRData.StandingsTable.StandingsLists[0].DriverStandings,
      timestamp: Date.now()
    }
  }

  static async getConstructorStandings(): Promise<F1ApiResponse<Constructor[]>> {
    const { data } = await axios.get(`${BASE_URL}/constructorStandings.json`)
    return {
      data: data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
      timestamp: Date.now()
    }
  }

  static async getNextRace(): Promise<F1ApiResponse<Race>> {
    const { data } = await axios.get(`${BASE_URL}/next.json`)
    return {
      data: data.MRData.RaceTable.Races[0],
      timestamp: Date.now()
    }
  }
}

export type { Driver, Constructor, Race, F1ApiResponse }
