import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const travelsStore = create(
	persist(
		(set) => ({
			travelInfo: null,
			arrayTableTravels: null,
			setArrayTableTravels: (value) => set(() => ({ arrayTableTravels: value })),
			setTravelInfo: (value) => set(() => ({ travelInfo: value }))
		}),
		{ name: 'users-storage' }
	)
)
