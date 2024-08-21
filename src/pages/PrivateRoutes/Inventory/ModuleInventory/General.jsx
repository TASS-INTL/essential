import React, { useEffect, useState } from 'react'

import { battery, padlockClose, padlockOpen } from '@/assets/assetsplatform'
import { inventoryStore } from '@/store/inventoryStore'
import { useLocation, useParams } from 'react-router-dom'

import { TapBottons } from '../../components'
import { Map } from '../../components/Map'
import { arrayTapInventory } from '../../components/TapBottons'
import { useMap } from '../../Hooks/useMap'
import { useInventory } from './Hooks/useInventory'

export const General = () => {
	const location = useLocation()
	const { idDevice } = useParams()
	const { createMarkerMap, setMapGlobal, mapGlobal, deleteMarkerMap } = useMap()
	const { handleSendComand } = useInventory()
	const deviceInfo = inventoryStore((state) => state.deviceInfo)
	const [markerState, setMarkerState] = useState(null)

	const SendCommand = (typeComand, to) => {
		handleSendComand({ idDevice, typeComand, did: deviceInfo?.general?.did, to })
	}

	useEffect(() => {
		if (mapGlobal && deviceInfo?.general?.last_location?.lng) {
			if (markerState !== null) {
				deleteMarkerMap(markerState)
				setMarkerState(null)
			}
			let marker = createMarkerMap(
				deviceInfo?.general?.last_location?.lng,
				deviceInfo?.general?.last_location?.lat,
				mapGlobal,
				false
			)
			setMarkerState(marker)
		}
	}, [mapGlobal, deviceInfo?.general?.last_location?.lng, deviceInfo?.general?.last_location?.lat])

	return (
		<>
			<TapBottons location={location} idDevice={idDevice} path='devices-screen/device' data={arrayTapInventory} />
			<div className='pt-2'>
				<section className='my-2'>
					<h3 className='text-center font-bold text-2xl pb-2'>GENERAL</h3>
					<div className='flex flex-row w-full justify-between'>
						<div className='flex flex-col'>
							<span className=' font-bold text-lg'>
								Id : <span className=' font-normal text-sm'> {deviceInfo?._id}</span>
							</span>
							<span className=' font-bold text-lg'>
								Did: <span className=' font-normal text-sm'> {deviceInfo?.general?.did}</span>
							</span>
							<span className=' font-bold text-lg'>
								Lock: <span className=' font-normal text-sm'> {deviceInfo?.general?.lock?.value}</span>
							</span>
							<span className=' font-bold text-lg'>
								Name: <span className=' font-normal text-sm'> {deviceInfo?.general?.did}</span>
							</span>
							<span className=' font-bold text-lg'>
								Lote: <span className=' font-normal text-sm'> {deviceInfo?.general?.lote}</span>
							</span>
							<span className=' font-bold text-lg'>
								Nickname :<span className=' font-normal text-sm'> {deviceInfo?.general?.nickname}</span>
							</span>
							<span className=' font-bold text-lg'>
								State : <span className=' font-normal text-sm'> {deviceInfo?.general?.state}</span>
							</span>
							<span className=' font-bold text-lg'>
								Type_state :
								<span className=' font-normal text-sm'> {deviceInfo?.general?.type_state}</span>
							</span>
							<span className=' font-bold text-lg'>
								Lat :
								<span className=' font-normal text-sm'> {deviceInfo?.general?.last_location?.lat}</span>
							</span>
							<span className=' font-bold text-lg'>
								Lng :
								<span className=' font-normal text-sm'> {deviceInfo?.general?.last_location?.lng}</span>
							</span>
						</div>
						<div className='w-4/6 px-10'>
							<h5 className='text-center font-normal text-xl'>Ultima ubicacion</h5>
							<Map width='100' height='100' setMapGlobal={setMapGlobal} />
							<div className='flex flex-row gap-6 justify-center'>
								<button
									onClick={() => SendCommand(null, 'location')}
									className='bg-lime-700 py-2 px-5 text-white rounded-lg'
								>
									Location
								</button>
							</div>
						</div>
					</div>
				</section>

				<section>
					<h3 className='text-center font-bold text-2xl'>CONTROL</h3>
					<div className='py-10'>
						<div className='flex flex-row'>
							<div className='flex flex-col justify-center items-center py-2 px-10 '>
								<span className=' text-pretty'>
									Estado: <span> {deviceInfo?.general?.lock?.value}</span>
								</span>
								<img
									src={deviceInfo?.general?.lock?.value === 'open' ? padlockOpen : padlockClose}
									alt='icon'
									className='w-[108px] h-[105px] object-contain cursor-pointer my-4'
								/>
								<div className='flex flex-row gap-6'>
									<button
										onClick={() => SendCommand('open', 'lock')}
										className='bg-lime-700 py-2 px-5 text-white rounded-lg'
									>
										Abrir
									</button>
									<button
										onClick={() => SendCommand('close', 'lock')}
										className='bg-red-700 py-2 px-5 text-white rounded-lg'
									>
										Cerrar
									</button>
								</div>
							</div>
							<div className='w-[1.3px] my-3  bg-black h-60' />
							<div className='flex flex-col justify-center items-center py-2 px-10'>
								<span>Carga: {deviceInfo?.general?.batery?.value}%</span>
								<img
									src={battery}
									alt='icon'
									className='w-[108px] h-[105px] object-contain cursor-pointer my-4'
								/>
								<div className='flex flex-row gap-6'>
									<button
										onClick={() => SendCommand(null, 'battery')}
										className='bg-lime-700 py-2 px-5 text-white rounded-lg'
									>
										Bateria
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section>
					<h3 className='pt-10'>COMUNICATION</h3>
				</section>

				<section>
					<h3 className='pt-10'>IOT CORE</h3>
				</section>
			</div>
		</>
	)
}
