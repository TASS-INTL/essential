import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const userStore = create(
	persist(
		(set) => ({
			token: false,
			userData: {
				uid: '',
				name: '',
				email: '',
				token: '',
				userName: '',
				logged: false,
				checking: true,
				tokenRegister: null
			},
			setToken: (value) => set(() => ({ token: value })),
			setUserData: (value) => set(() => ({ userData: value }))
		}),
		{ name: 'user-storage' }
	)
)
