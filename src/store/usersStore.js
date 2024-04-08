import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const usersStore = create(
	persist(
		(set) => ({
			modal: false,
			notification: null,
			nameSpace: null,
			setModalVisible: (value) => set(() => ({ modal: value })),
			setNameSpace: (value) => set(() => ({ nameSpace: value })),
			setNotification: (value) => set(() => ({ notification: value }))
		}),
		{ name: 'users-storage' }
	)
)
