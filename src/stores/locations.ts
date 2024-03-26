import { defineStore } from 'pinia'
import locations from '@/shared/data/data.json'

interface ChurchDetails {
  name: string
  phone: string
  weekdays: string
  Saturday_morning: string
  Saturday_late: string
  Dominical: string
  address: string
  latitude: string
  longitude: string
}

interface State {
  locations: ChurchDetails[]
}

export const useLocations = defineStore('myStore', {
  state: (): State => ({
    locations: locations.churches_details as ChurchDetails[]
  }),
  getters: {},
  actions: {}
})
