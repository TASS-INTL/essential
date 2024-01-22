import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const userStore = create(
	persist(
		(set) => ({
			userData: {
				uid: '',
				name: '',
				email: '',
				userName: '',
				logged: false,
				checking: true,
				state: null,
				tokenRegister: null,
				tokenSesion: null,
				modules: null
			},
			setUserData: (value) => set(() => ({ userData: value }))
		}),
		{ name: 'user-storage' }
	)
)
