import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const deviceInfoStore = create(
    persist(
        (set) => ({
            general: null,
            events: null,
            tests: null,
            process: null,
            travels: null,
            inRealTimeTravelInfo: null,
            setGeneral: (value) => set(() => ({ general: value })),
            setEvents: (value) => set(() => ({ events: value })),
            setTests: (value) => set(() => ({ tests: value })),
            setProcess: (value) => set(() => ({ process: value })),
            setTravels: (value) => set(() => ({ travels: value })),
            setInRealTimeTravelInfo: (value) => set(() => ({ inRealTimeTravelInfo: value }))
        }),
        { name: 'device-info-general-storage' }
    )
)