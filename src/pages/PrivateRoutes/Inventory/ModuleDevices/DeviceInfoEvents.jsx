import React from 'react'

import { ErrorComponent, LoaderComponent, TitleWithLive } from '@/Components'
import { BoardDevice } from '@/Components/BoardDevice'
import { Container } from '@/Components/Container'
import { arrayTapInventory, TapBottons } from '@/Components/TapBottons'
import { deviceInfoStore } from '@/store/devices/deviceInfoStore'
import { useLocation, useParams } from 'react-router-dom'

export const DeviceInfoEvents = () => {
    const { idDevice } = useParams()
    const location = useLocation()

    const deviceInfoEvents = deviceInfoStore((state) => state.events)

    if (deviceInfoEvents === null) return <LoaderComponent />

    if (deviceInfoEvents.error) return <ErrorComponent error={deviceInfoEvents.message} />

    return (
        <div className='px-10'>
            <TapBottons location={location} idDevice={idDevice} path='devices-screen/device' data={arrayTapInventory} />
            <TitleWithLive title='EVENTOS' inLive />
            <BoardDevice dataBody={deviceInfoEvents?.data?.results} />
        </div>
    )
}
