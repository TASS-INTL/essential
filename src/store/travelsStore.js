import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const travelsStore = create(
	persist(
		(set) => ({
			travelInfo: null,
			coordinates: null,
			realTimeCoordinates: null,
			arrayTableTravels: null,
			arrayTableTravelsEvents: null,
			arrayTableTravelsMonitoring: null,
			setTravelInfo: (value) => set(() => ({ travelInfo: value })),
			setCoordinates: (value) => set(() => ({ coordinates: value })),
			setRealTimeCoordinates: (value) => set(() => ({ realTimeCoordinates: value })),
			setArrayTableTravels: (value) => set(() => ({ arrayTableTravels: value })),
			setArrayTableTravelsEvents: (value) => set(() => ({ arrayTableTravelsEvents: value })),
			setArrayTableTravelsMonitoring: (value) => set(() => ({ arrayTableTravelsMonitoring: value }))
		}),
		{ name: 'travel-storage' }
	)
)
