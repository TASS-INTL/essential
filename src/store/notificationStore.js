import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const notificationStore = create(
	persist(
		(set) => ({
			arrayNotification: null,
			setArrayNotification: (value) => set(() => ({ arrayNotification: value }))
		}),
		{ name: 'users-storage' }
	)
)
