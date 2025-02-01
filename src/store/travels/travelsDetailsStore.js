import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const travelsDetailsStore = create(
    persist(
        (set) => ({
            travelsDetails: null,
            setTravelsDetails: (value) => set(() => ({ travelsDetails: value }))
        }),
        { name: 'travels-details-storage' }
    )
)