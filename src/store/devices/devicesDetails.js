import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const devicesDetails = create(
    persist(
        (set) => ({
            devicesDetails: null,
            setDevicesDetails: (value) => set(() => ({ devicesDetails: value }))
        }),
        { name: 'devices-details-storage' }
    )
)