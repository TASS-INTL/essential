import React from 'react'

import { battery, padlockClose, padlockOpen } from '@/assets/assetsplatform'
import { ErrorComponent, LoaderComponent } from '@/Components'
import { Container } from '@/Components/Container'
import { MapGoogle } from '@/Components/mapGoogle/Map'
import { MarkerComponent } from '@/Components/mapGoogle/Marker'
import { arrayTapInventory, TapBottons } from '@/Components/TapBottons'
import { inventoryStore } from '@/store/inventoryStore'
import { APIProvider } from '@vis.gl/react-google-maps'
import { useLocation, useParams } from 'react-router-dom'

import { API_KEY_GOOGLE_MAPS } from '../../constants/constants'
import { useInventory } from './Hooks/useInventory'

export const General = () => {
	const location = useLocation()
	const { idDevice } = useParams()
	const { handleSendComand } = useInventory()
	const deviceInfo = inventoryStore((state) => state.deviceInfo)

	const SendCommand = ({ typeComand, to }) => {
		handleSendComand({ idDevice, typeComand, did: deviceInfo?.data?.general?.did, to })
	}

	if (deviceInfo === null) return <LoaderComponent />

	if (deviceInfo.error) return <ErrorComponent error={deviceInfo.message} />

	return (
		<div className='px-12'>
			<TapBottons location={location} idDevice={idDevice} path='devices-screen/device' data={arrayTapInventory} />
			<div className='pt-2'>
				<section className='flex flex-row'>
					<div className='w-[40%] flex flex-col'>
						<span className=' font-bold text-lg'>
							Id : <span className=' font-normal text-sm'> {deviceInfo?.data?._id}</span>
						</span>
						<span className=' font-bold text-lg'>
							Did: <span className=' font-normal text-sm'> {deviceInfo?.data?.general?.did}</span>
						</span>
						<span className=' font-bold text-lg'>
							Lock:{' '}
							<span className=' font-normal text-sm'> {deviceInfo?.data?.general?.lock?.value}</span>
						</span>
						<span className=' font-bold text-lg'>
							Name: <span className=' font-normal text-sm'> {deviceInfo?.data?.general?.did}</span>
						</span>
						<span className=' font-bold text-lg'>
							Lote: <span className=' font-normal text-sm'> {deviceInfo?.data?.general?.lote}</span>
						</span>
						<span className=' font-bold text-lg'>
							Nickname :
							<span className=' font-normal text-sm'> {deviceInfo?.data?.general?.nickname}</span>
						</span>
						<span className=' font-bold text-lg'>
							State : <span className=' font-normal text-sm'> {deviceInfo?.data?.general?.state}</span>
						</span>
						<span className=' font-bold text-lg'>
							Type_state :
							<span className=' font-normal text-sm'> {deviceInfo?.data?.general?.type_state}</span>
						</span>
						<span className=' font-bold text-lg'>
							Lat :
							<span className=' font-normal text-sm'>
								{' '}
								{deviceInfo?.data?.general?.last_location?.lat}
							</span>
						</span>
						<span className=' font-bold text-lg'>
							Lng :
							<span className=' font-normal text-sm'>
								{' '}
								{deviceInfo?.data?.general?.last_location?.lng}
							</span>
						</span>
					</div>
					<div className='w-[60%] flex flex-col'>
						<h5 className='text-center font-normal text-xl'>ÚLTIMA UBICACIÓN</h5>
						<APIProvider apiKey={API_KEY_GOOGLE_MAPS}>
							<MapGoogle width='100%'>
								<MarkerComponent
									lat={deviceInfo?.data.general?.last_location?.lat}
									lng={deviceInfo?.data.general?.last_location?.lng}
								/>
							</MapGoogle>
						</APIProvider>
						<div className='flex flex-row gap-6 justify-center'>
							<button
								onClick={() => SendCommand({ typeComand: null, to: 'location' })}
								className='bg-lime-700 py-2 px-5 text-white rounded-lg mt-2'
							>
								Ubicacion
							</button>
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
									src={deviceInfo?.data?.general?.lock?.value === 'open' ? padlockOpen : padlockClose}
									alt='icon'
									className='w-[108px] h-[105px] object-contain cursor-pointer my-4'
								/>
								<div className='flex flex-row gap-6'>
									<button
										onClick={() => SendCommand({ typeComand: 'open', to: 'lock' })}
										className='bg-lime-700 py-2 px-5 text-white rounded-lg'
									>
										Abrir
									</button>
									<button
										onClick={() => SendCommand({ typeComand: 'close', to: 'lock' })}
										className='bg-red-700 py-2 px-5 text-white rounded-lg'
									>
										Cerrar
									</button>
								</div>
							</div>
							<div className='w-[1.3px] my-3  bg-black h-60' />
							<div className='flex flex-col justify-center items-center py-2 px-10'>
								<span>Carga: {deviceInfo?.data?.general?.batery?.value}%</span>
								<img
									src={battery}
									alt='icon'
									className='w-[108px] h-[105px] object-contain cursor-pointer my-4'
								/>
								<div className='flex flex-row gap-6'>
									<button
										onClick={() => SendCommand({ typeComand: null, to: 'battery' })}
										className='bg-lime-700 py-2 px-5 text-white rounded-lg'
									>
										Bateria
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* <section>
					<h3 className='pt-10'>COMUNICATION</h3>
				</section>
				<section>
					<h3 className='pt-10'>IOT CORE</h3>
				</section> */}
			</div>
		</div>
	)
}
