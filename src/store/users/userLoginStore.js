import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const userLoginStore = create(
    persist(
        (set) => ({
            email: '',
            token: '',
            validated: false,
            modalUser: false,
            setField: (field, value) => set((state) => ({ ...state, [field]: value }))
        }),
        { name: 'user-storage' }
    )
);