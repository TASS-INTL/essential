import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const deviceStore = create(
	persist(
		(set) => ({
			arrayTabledevice: null,
			setArrayTabledevice: (value) => set(() => ({ arrayTabledevice: value }))
		}),
		{ name: 'users-storage' }
	)
)
