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
		<div className='absolute top-0 right-0 bg-white h-full w-3/5 p-3'>
			<TapBottons
				location={location}
				idDevice={idTravel}
				path='travels-screen/travel'
				data={arrayTapMonitoring}
			/>
			<div className='overflow-y-scroll overflow-hidden h-[91%]'>
				<div className='pt-2 pl-2 grid grid-cols-1 flex-col gap-2'>
					{/* General */}
					<SectionCard>
						<h2 className='text-sm font-bold text-start pb-3'>General</h2>
						<div className='flex flex-col'>
							<RowInformation title='Did' info={travelInfo?.data?.did} />
							<RowInformation title='Id' info={travelInfo?.data?._id} />
							<RowInformation title='Estado' info={travelInfo?.data?.status} />
							<RowInformation title='Fecha de finalizacion' info={travelInfo?.data?.date_finalization} />
							<RowInformation title='Fecha de instalacion' info={travelInfo?.data?.date_installation} />
						</div>
					</SectionCard>
					{/* Service */}
					<SectionCard>
						<h2 className='text-sm font-bold text-start pb-3'>Servicio</h2>
						<div className='flex flex-col'>
							<RowInformation title='Ruta' info={travelInfo?.data?.routing?.name_routing} />
							<RowInformation
								title='Instalacion'
								info={trimText(travelInfo?.data?.location_installation?.name, 20)}
							/>
							<RowInformation
								title='Desinstalacion'
								info={trimText(travelInfo?.data?.location_finalization?.name, 20)}
							/>
							<RowInformation
								title='Progreso de viaje'
								info={`${travelInfo?.data?.travel_time?.progress}%`}
							/>
						</div>
					</SectionCard>
					{/* Viaje */}
					<SectionCard>
						<h2 className='text-sm font-bold text-start pb-3'>Viaje</h2>
						<div className='flex flex-col'>
							<RowInformation title='Ruta' info={travelInfo?.data?.routing.name_routing} />
							<RowInformation
								title='Instalacion'
								info={trimText(travelInfo?.data?.location_installation?.name, 20)}
							/>
							<RowInformation
								title='Desinstalacion'
								info={trimText(travelInfo?.data?.location_finalization?.name, 20)}
							/>
							<RowInformation
								title='Progreso de viaje'
								info={`${travelInfo?.data?.travel_time?.progress}%`}
							/>
						</div>
					</SectionCard>
					{/* Devices */}
					<SectionCard>
						<div className='flex justify-between items-center pb-4'>
							<h2 className='text-sm font-bold text-start pb-3'>Devices</h2>
							<img
								src={travelInfo?.data?.devices[0]?.lock === 'open' ? padlockOpen : padlockClose}
								alt='icon'
								className='w-[38px] h-[50px] cursor-pointer'
							/>
						</div>
						<div className='flex flex-col'>
							<RowInformation title='Did' info={travelInfo?.data?.devices[0]?.did} />
							<RowInformation title='Lock' info={travelInfo?.data?.devices[0]?.lock} />
							<RowInformation title='Nick name' info={travelInfo?.data?.devices[0]?.nickname} />
							<RowInformation title='En linea' info={travelInfo?.data?.devices[0]?.on_live} />
							<RowInformation title='Red' info={travelInfo?.data?.devices[0]?.red} />
							<RowInformation title='Estado' info={travelInfo?.data?.devices[0]?.status} />
						</div>
					</SectionCard>
					{/* Installers */}
					<SectionCard>
						<h2 className='text-sm font-bold text-start pb-3'>Operaciones</h2>
						<div className='flex flex-col'>
							<RowInformation title='Estado' info={travelInfo?.data?.devices[0]?.status} />
							<RowInformation title='Estado' info={travelInfo?.data?.devices[0]?.status} />
							<RowInformation title='Estado' info={travelInfo?.data?.devices[0]?.status} />
							<RowInformation title='Estado' info={travelInfo?.data?.devices[0]?.status} />
							<RowInformation title='Estado' info={travelInfo?.data?.devices[0]?.status} />
						</div>
					</SectionCard>
				</div>
			</div>
		</div>
	)
}
