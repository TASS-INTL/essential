import React from 'react'

import { padlockClose, padlockOpen } from '@/assets/assetsplatform'
import { LoaderComponent, RowInformation, SectionCard } from '@/Components'
import { arrayTapMonitoring, TapBottons } from '@/Components/TapBottons'
import { trimText } from '@/helpers/routes'
import { travelsStore } from '@/store/travelsStore'
import { useLocation, useParams } from 'react-router-dom'

export const GeneralTravel = () => {
	const location = useLocation()
	const { idTravel } = useParams()

	const travelInfo = travelsStore((state) => state.travelInfo)

	if (travelInfo === null) return <LoaderComponent />

	return (
		<div className='absolute top-0 right-0 bg-white h-full w-3/5'>
			<TapBottons
				location={location}
				idDevice={idTravel}
				path='travels-screen/travel'
				data={arrayTapMonitoring}
			/>
			<div className='overflow-y-scroll overflow-hidden h-[91%]'>
				<div className='pt-2 pl-2 grid grid-cols-1 flex-col gap-2'>
					{/* <div className='flex flex-row gap-6 justify-end'>
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
				</div> */}
					{/* General */}
					<SectionCard>
						<h2 className='text-sm font-bold text-start pb-3'>General</h2>
						<div className='flex flex-col'>
							<RowInformation title='Did' info={travelInfo?.did} />
							<RowInformation title='Id' info={travelInfo?._id} />
							<RowInformation title='Estado' info={travelInfo?.status} />
							<RowInformation title='Fecha de finalizacion' info={travelInfo?.date_finalization} />
							<RowInformation title='Fecha de instalacion' info={travelInfo?.date_installation} />
						</div>
					</SectionCard>
					{/* Service */}
					<SectionCard>
						<h2 className='text-sm font-bold text-start pb-3'>Servicio</h2>
						<div className='flex flex-col'>
							<RowInformation title='Ruta' info={travelInfo?.routing.name_routing} />
							<RowInformation
								title='Instalacion'
								info={trimText(travelInfo?.location_installation?.name, 20)}
							/>
							<RowInformation
								title='Desinstalacion'
								info={trimText(travelInfo?.location_finalization?.name, 20)}
							/>
							<RowInformation title='Progreso de viaje' info={`${travelInfo?.travel_time?.progress}%`} />
						</div>
					</SectionCard>
					{/* Viaje */}
					<SectionCard>
						<h2 className='text-sm font-bold text-start pb-3'>Viaje</h2>
						<div className='flex flex-col'>
							<RowInformation title='Ruta' info={travelInfo?.routing.name_routing} />
							<RowInformation
								title='Instalacion'
								info={trimText(travelInfo?.location_installation?.name, 20)}
							/>
							<RowInformation
								title='Desinstalacion'
								info={trimText(travelInfo?.location_finalization?.name, 20)}
							/>
							<RowInformation title='Progreso de viaje' info={`${travelInfo?.travel_time?.progress}%`} />
						</div>
					</SectionCard>
					{/* Devices */}
					<SectionCard>
						<div className='flex justify-between items-center pb-4'>
							<h2 className='text-sm font-bold text-start pb-3'>Devices</h2>
							<img
								src={travelInfo?.devices[0]?.lock === 'open' ? padlockOpen : padlockClose}
								alt='icon'
								className='w-[38px] h-[50px] cursor-pointer'
							/>
						</div>
						<div className='flex flex-col'>
							<RowInformation title='Did' info={travelInfo?.devices[0]?.did} />
							<RowInformation title='Lock' info={travelInfo?.devices[0]?.lock} />
							<RowInformation title='Nick name' info={travelInfo?.devices[0]?.nickname} />
							<RowInformation title='En linea' info={travelInfo?.devices[0]?.on_live} />
							<RowInformation title='Red' info={travelInfo?.devices[0]?.red} />
							<RowInformation title='Estado' info={travelInfo?.devices[0]?.status} />
						</div>
					</SectionCard>
					{/* Installers */}
					<SectionCard>
						<h2 className='text-sm font-bold text-start pb-3'>Instaladores</h2>
						<div className='flex flex-col'>
							<RowInformation title='Estado' info={travelInfo?.devices[0]?.status} />
							<RowInformation title='Estado' info={travelInfo?.devices[0]?.status} />
							<RowInformation title='Estado' info={travelInfo?.devices[0]?.status} />
							<RowInformation title='Estado' info={travelInfo?.devices[0]?.status} />
							<RowInformation title='Estado' info={travelInfo?.devices[0]?.status} />
						</div>
					</SectionCard>
				</div>
			</div>
		</div>
	)
}
