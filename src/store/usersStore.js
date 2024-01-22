import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const usersStore = create(
	persist(
		(set) => ({
			dataUsers: {
				users: null,
				policy: null,
				policies: null,
				types_profiles: null
			},
			setUserData: (value) => set(() => ({ dataUsers: value }))
		}),
		{ name: 'users-storage' }
	)
)
