import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const travelsStore = create(
	persist(
		(set) => ({
			travelInfo: null,
			arrayTableTravels: null,
			arrayTableTravelsEvents: null,
			arrayTableTravelsMonitoring: null,
			realTimeCoordinates: null,
			setRealTimeCoordinates: (value) => set(() => ({ realTimeCoordinates: value })),
			setArrayTableTravels: (value) => set(() => ({ arrayTableTravels: value })),
			setArrayTableTravelsEvents: (value) => set(() => ({ arrayTableTravelsEvents: value })),
			setArrayTableTravelsMonitoring: (value) => set(() => ({ arrayTableTravelsMonitoring: value })),
			setTravelInfo: (value) => set(() => ({ travelInfo: value }))
		}),
		{ name: 'users-storage' }
	)
)
