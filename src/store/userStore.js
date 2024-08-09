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
			modalUser: false,
			setModalUserVisible: (value) => set(() => ({ modalUser: value })),
			setUserData: (value) => set(() => ({ userData: value }))
		}),
		{ name: 'user-storage' }
	)
)
