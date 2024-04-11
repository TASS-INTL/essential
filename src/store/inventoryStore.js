import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const inventoryStore = create(
	persist(
		(set) => ({
			arrayTableInventory: null,
			setArrayTableInventory: (value) => set(() => ({ arrayTableInventory: value }))
		}),
		{ name: 'users-storage' }
	)
)
