import React from 'react'

import { useLocation, useParams } from 'react-router-dom'

import { padlockClose } from '../../../../assets/assetsplatform'
import { LoaderComponent } from '../../../../Components'
import { travelsStore } from '../../../../store/travelsStore'
import { TapBottons } from '../../components'
import { arrayTapMonitoring } from '../../components/TapBottons'
import { useTravels } from './hooks/useTravels'

export const GeneralTravel = () => {
	const location = useLocation()
	const { idTravel } = useParams()
	const { handleActivateTravel } = useTravels()

	const travelInfo = travelsStore((state) => state.travelInfo)

	if (travelInfo === null) return <LoaderComponent />

	return (
		<div>
			<TapBottons
				location={location}
				idDevice={idTravel}
				path='travels-screen/travel'
				data={arrayTapMonitoring}
			/>
			<div className='pt-10'>
				<div className='flex flex-row gap-6 justify-end'>
					<button
						onClick={() => handleActivateTravel({ idTravel, type: 'activate' })}
						className='bg-lime-700 py-2 px-5 text-white rounded-lg'
					>
						Activar Viaje
					</button>
					<button
						onClick={() => handleActivateTravel({ idTravel, type: 'deactivate' })}
						className='bg-red-700 py-2 px-5 text-white rounded-lg'
					>
						Desactivar viaje
					</button>
				</div>
				<section>
					<h2 className=' text-lg font-bold text-center'>General</h2>
					<div className='flex flex-col'>
						<span className=' font-bold text-lg'>
							Did Travel:<span className=' font-normal text-sm'> {travelInfo[0]?.general?.did}</span>
						</span>
						<span className=' font-bold text-lg'>
							Id :<span className=' font-normal text-sm'> {travelInfo[0]?.general?.id}</span>
						</span>
						<span className=' font-bold text-lg'>
							Status :<span className=' font-normal text-sm'> {travelInfo[0]?.general?.status}</span>
						</span>
						<span className=' font-bold text-lg'>
							Numero de eventos :
							<span className=' font-normal text-sm'> {travelInfo[0]?.general?.number_events}</span>
						</span>
						<span className=' font-bold text-lg'>
							creado :<span className=' font-normal text-sm'> {travelInfo[0]?.general?.created_at}</span>
						</span>
					</div>
				</section>
				<section className='pt-10'>
					<h2 className=' text-lg font-bold text-center'>Devices</h2>
					<img
						// src={deviceInfo?.general?.lock?.value === 'open' ? padlockOpen : padlockClose}
						src={padlockClose}
						alt='icon'
						className='w-[108px] h-[105px] object-contain cursor-pointer my-4'
					/>
					<div className='flex flex-col'>
						<span className=' font-bold text-lg'>
							Did :<span className=' font-normal text-sm'> {travelInfo[0]?.devices[0]?.did}</span>
						</span>
						<span className=' font-bold text-lg'>
							Id_device :
							<span className=' font-normal text-sm'> {travelInfo[0]?.devices[0]?.id_device}</span>
						</span>
						<span className=' font-bold text-lg'>
							Status :<span className=' font-normal text-sm'> {travelInfo[0]?.devices[0]?.status}</span>
						</span>
						<span className=' font-bold text-lg'>
							Id :<span className=' font-normal text-sm'> {travelInfo[0]?.devices[0]?._id}</span>
						</span>
					</div>
				</section>
				<section className='pt-10'>
					<h2 className=' text-lg font-bold text-center'>Instaladores</h2>
					<div className='flex flex-col'>
						<span className=' font-bold text-lg'>
							Nombre :<span className=' font-normal text-sm'> {travelInfo[0]?.installers[0]?.name}</span>
						</span>
						<span className=' font-bold text-lg'>
							Tipo de operacion :
							<span className=' font-normal text-sm'>{travelInfo[0]?.installers[0]?.type_operation}</span>
						</span>
						<span className=' font-bold text-lg'>
							Id :<span className=' font-normal text-sm'> {travelInfo[0]?.installers[0]?._id}</span>
						</span>
					</div>
				</section>
			</div>
		</div>
	)
}
