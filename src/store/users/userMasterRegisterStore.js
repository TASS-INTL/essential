import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const userMasterRegisterStore = create(
    persist(
        (set) => ({
            email: '',
            username: '',
            token: '',
            code: '',
            validated: false,
            modalUser: false,
            setField: (field, value) => set((state) => ({ ...state, [field]: value }))
        }),
        { name: 'user-storage' }
    )
)