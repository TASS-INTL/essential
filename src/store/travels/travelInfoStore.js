import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const travelInfoStore = create(
    persist(
        (set) => ({
            general: null,
            events: null,
            reports: null,
            process: null,
            monitoring: null,
            coordinates: null,
            inRealTimeTravelInfo: null,
            setGeneral: (value) => set(() => ({ general: value })),
            setEvents: (value) => set(() => ({ events: value })),
            setReports: (value) => set(() => ({ reports: value })),
            setProcess: (value) => set(() => ({ process: value })),
            setMonitoring: (value) => set(() => ({ monitoring: value })),
            setCoordinates: (value) => set(() => ({ coordinates: value })),
            setInRealTimeTravelInfo: (value) => set(() => ({ inRealTimeTravelInfo: value })),
        }),
        { name: 'travel-info-storage' }
    )
)