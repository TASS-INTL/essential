import React from 'react'

import { useLocation, useParams } from 'react-router-dom'

import { arrayTapInventory, TapBottons } from '@/Components/TapBottons'
import { deviceInfoStore } from '@/store/devices/deviceInfoStore'


export const DeviceInfoTests = () => {
    const location = useLocation()
    const { idDevice } = useParams()
    const deviceInfoTests = deviceInfoStore((state) => state.tests)

    // const { handleSendComandTest } = useInventory()

    const SendCommand = (to) => {
        console.log('to', to)
        // handleSendComandTest({ idDevice, did: deviceInfoTests?.general?.did, to })
    }

    return (
        <div>
            <TapBottons location={location} idDevice={idDevice} path='devices-screen/device' data={arrayTapInventory} />
            <div className='pt-10'>
                <div className=' flex justify-end'>
                    <button
                        onClick={() => SendCommand('create')}
                        className='bg-lime-700 py-2 px-5 text-white rounded-lg'
                    >
                        Hacer test
                    </button>
                </div>
                <h1 className=' text-2xl pb-5'>Tabla de testing</h1>
                {/* <BoardDevice dataBody={arrayTableInventoryTest?.data?.results} /> */}
            </div>
        </div>
    )
}
