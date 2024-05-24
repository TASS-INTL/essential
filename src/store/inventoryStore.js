import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const inventoryStore = create(
	persist(
		(set) => ({
			deviceInfo: null,
			arrayTableInventory: null,
			arrayTableInventoryEvents: null,
			arrayTableInventoryTest: null,
			setDeviceInfo: (value) => set(() => ({ deviceInfo: value })),
			setArrayTableInventory: (value) => set(() => ({ arrayTableInventory: value })),
			setArrayTableInventoryTest: (value) => set(() => ({ arrayTableInventoryTest: value })),
			setArrayTableInventoryEvents: (value) => set(() => ({ arrayTableInventoryEvents: value }))
		}),
		{ name: 'inventory-storage' }
	)
)
