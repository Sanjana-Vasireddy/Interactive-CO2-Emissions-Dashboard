import { defineStore } from 'pinia'

export const useChartStore = defineStore('chartdata', {
  state: () => ({ 
    covid: undefined,
    planets: undefined,
    planetsMulti: undefined,
    upc: undefined
  })
})