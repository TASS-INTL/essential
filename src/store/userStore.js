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
				tokenRegister: null,
				tokenSesion: null
			},
			setUserData: (value) => set(() => ({ userData: value }))
		}),
		{ name: 'user-storage' }
	)
)
