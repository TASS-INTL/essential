import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const usersStore = create(
	persist(
		(set) => ({
			notification: null,
			nameSpace: null,
			setNameSpace: (value) => set(() => ({ nameSpace: value })),
			setNotification: (value) => set(() => ({ notification: value }))
		}),
		{ name: 'users-storage' }
	)
)
