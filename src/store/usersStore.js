import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const usersStore = create(
	persist(
		(set) => ({
			modal: false,
			setModalVisible: (value) => set(() => ({ modal: value }))
		}),
		{ name: 'users-storage' }
	)
)
