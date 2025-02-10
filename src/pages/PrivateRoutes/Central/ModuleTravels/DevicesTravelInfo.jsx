import React from 'react'
import { useState } from 'react'
import { arrayTapMonitoring, TapBottons } from '@/Components/TapBottons'
import { useLocation, useParams } from 'react-router-dom'
import { travelInfoStore } from '@/store/travels/travelInfoStore'
import { TitleWithLive } from '@/Components'
import { padlockClose, padlockOpen } from '@/assets/assetsplatform'
import { Button } from 'flowbite-react'
import { ButtonOlympoUI } from '@/Components/ui/ButtonOlympoUI'
import { ModalOlympo } from '@/Components/ui/ModalOlympo'
import { useForm } from 'react-hook-form'
import { useTravels } from './hooks/useTravels'
import { LoaderComponent } from '@/Components'

export const DevicesTravelInfo = () => {
    const location = useLocation()
    const { idTravel } = useParams()
    const generalTravelInfo = travelInfoStore((state) => state.general)
    const [isOpen, setIsOpen] = useState(false)
    const [ didDeviceBonding, setDidDeviceBonding ] = useState('')

    const { handleBondigDeviceTravelService } = useTravels()

    const { register, handleSubmit, reset } = useForm()

    const deviceMock = [{
        lock: 'open',
        did: '123456789',
        nickname: 'Dispositivo 1',
        status: 'Activo',
        on_live: true,
        red: 'Movistar',
        _id: 'dev123',
    }]

    const handleGoToDevice = () => {
        console.log('Ir al dispositivo')
    }

    const handleBondingDevice = async (data) => {
        console.log('data', data)
        const response = await handleBondigDeviceTravelService(idTravel, data.did_device)
        console.log('response', response)   
        // handleCloseModal()
    }

    const handleCloseModal = () => {
        setIsOpen(false)
        // reset form here and clear input
        reset()

    }

    return (
        <div className='bg-white p-3 pt-6 min-w-[500px]'>
            <TapBottons
                location={location}
                idDevice={idTravel}
                path='travels-screen/travel'
                data={arrayTapMonitoring}
            />
            <div className='relative h-[81%]'>
                <TitleWithLive title='DISPOSITIVOS' inLive />
                <ButtonOlympoUI
                    handleOnClick={() => setIsOpen(true)}
                    text={'Añadir Dispositivo'}
                />
                {generalTravelInfo === null ? <LoaderComponent /> : generalTravelInfo?.data?.devices.length === 0 ? null : generalTravelInfo?.data?.devices.map((device) => (
                    <div key={device._id} className="bg-white rounded-lg shadow-md p-6 w-80 border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
                        {/* Línea de estado de lock */}
                        <div className="flex items-center justify-between mb-4">
                            <img
                                src={device.lock === 'open' ? padlockOpen : padlockClose}
                                alt="lock-status"
                                className="w-8 h-10 cursor-pointer"
                            />
                            <span
                                className={`text-sm font-semibold ${device.lock === 'open' ? 'text-green-500' : 'text-red-500'
                                    }`}
                            >
                                {device.lock === 'open' ? 'Desbloqueado' : 'Bloqueado'}
                            </span>
                        </div>

                        {/* Información del dispositivo */}
                        <div className="space-y-2">
                            <p className="text-gray-700">
                                <span className="font-bold">DID:</span> {device.did}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-bold">Nickname:</span> {device.nickname}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-bold">Estado:</span> {device.status}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-bold">En vivo:</span>{' '}
                                {device.on_live ? (
                                    <span className="text-green-500">Sí</span>
                                ) : (
                                    <span className="text-red-500">No</span>
                                )}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-bold">Red:</span> {device.red}
                            </p>
                        </div>

                        {/* Botón para ir al dispositivo */}
                        <button
                            onClick={handleGoToDevice}
                            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                        >
                            Ver Dispositivo
                        </button>
                    </div>
                ))}
                <ModalOlympo isOpen={isOpen} onClose={handleCloseModal} higth={70} width={70} modalTitle={'Vincular Dispositivo'}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit(handleBondingDevice)}>
                        <div className="mb-4">
                            <label for="codigo" className="block text-sm font-medium text-gray-700">
                                DID del dispositivo
                            </label>
                            <input
                                type="text"
                                id="did_device"
                                defaultValue={didDeviceBonding}
                                {...register('did_device')}
                                name="did_device"
                                placeholder="Ingresa el DID del dispositivo"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Vincular
                        </button>
                        </form>
                    </div>
                </ModalOlympo>
            </div>
        </div>
    )
}