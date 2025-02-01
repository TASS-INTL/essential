import React from 'react'

import { padlockClose, padlockOpen } from '@/assets/assetsplatform'
import { LoaderComponent, RowInformation, SectionCard } from '@/Components'
import { arrayTapMonitoring, TapBottons } from '@/Components/TapBottons'
import { trimText } from '@/helpers/routes'
import { travelsStore } from '@/store/travelsStore'
import { useLocation, useParams } from 'react-router-dom'
import { travelInfoStore } from '@/store/travels/travelInfoStore'

export const GeneralTravel = () => {
	const location = useLocation()
	const { idTravel } = useParams()

	const travelInfo = travelsStore((state) => state.travelInfo)
	const travelInfoGeneral = travelInfoStore((state) => state.general)

	if (travelInfoGeneral === null) return <LoaderComponent />

	return (
		<div className='top-0 right-0 bg-white h-full w-3/21 p-3 pt-6'>
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
							<RowInformation title='Did' info={travelInfoGeneral?.data?.did} />
							<RowInformation title='Id' info={travelInfoGeneral?.data?._id} />
							<RowInformation title='Estado' info={travelInfoGeneral?.data?.status} />
							<RowInformation title='Fecha de finalizacion' info={travelInfoGeneral?.data?.date_finalization} />
							<RowInformation title='Fecha de instalacion' info={travelInfoGeneral?.data?.date_installation} />
						</div>
					</SectionCard>
					{/* Service */}
					<SectionCard>
						<h2 className='text-sm font-bold text-start pb-3'>Servicio</h2>
						<div className='flex flex-col'>
							<RowInformation title='Ruta' info={travelInfoGeneral?.data?.routing?.name_routing} />
							<RowInformation
								title='Instalacion'
								info={trimText(travelInfoGeneral?.data?.location_installation?.name, 20)}
							/>
							<RowInformation
								title='Desinstalacion'
								info={trimText(travelInfoGeneral?.data?.location_finalization?.name, 20)}
							/>
							<RowInformation
								title='Progreso de viaje'
								info={`${travelInfoGeneral?.data?.travel_time?.progress}%`}
							/>
						</div>
					</SectionCard>
					{/* Viaje */}
					<SectionCard>
						<h2 className='text-sm font-bold text-start pb-3'>Viaje</h2>
						<div className='flex flex-col'>
							<RowInformation title='Ruta' info={travelInfoGeneral?.data?.routing.name_routing} />
							<RowInformation
								title='Instalacion'
								info={trimText(travelInfoGeneral?.data?.location_installation?.name, 20)}
							/>
							<RowInformation
								title='Desinstalacion'
								info={trimText(travelInfoGeneral?.data?.location_finalization?.name, 20)}
							/>
							<RowInformation
								title='Progreso de viaje'
								info={`${travelInfoGeneral?.data?.travel_time?.progress}%`}
							/>
						</div>
					</SectionCard>
					{/* Devices */}
					<SectionCard>
						<div className='flex justify-between items-center pb-4'>
							<h2 className='text-sm font-bold text-start pb-3'>Devices</h2>
							<img
								src={travelInfoGeneral?.data?.devices[0]?.lock === 'open' ? padlockOpen : padlockClose}
								alt='icon'
								className='w-[38px] h-[50px] cursor-pointer'
							/>
						</div>
						<div className='flex flex-col'>
							<RowInformation title='Did' info={travelInfoGeneral?.data?.devices[0]?.did} />
							<RowInformation title='Lock' info={travelInfoGeneral?.data?.devices[0]?.lock} />
							<RowInformation title='Nick name' info={travelInfoGeneral?.data?.devices[0]?.nickname} />
							<RowInformation title='En linea' info={travelInfoGeneral?.data?.devices[0]?.on_live} />
							<RowInformation title='Red' info={travelInfoGeneral?.data?.devices[0]?.red} />
							<RowInformation title='Estado' info={travelInfoGeneral?.data?.devices[0]?.status} />
						</div>
					</SectionCard>
					{/* Installers */}
					<SectionCard>
						<h2 className='text-sm font-bold text-start pb-3'>Operaciones</h2>
						<div className='flex flex-col'>
							<RowInformation title='Estado' info={travelInfoGeneral?.data?.devices[0]?.status} />
							<RowInformation title='Estado' info={travelInfoGeneral?.data?.devices[0]?.status} />
							<RowInformation title='Estado' info={travelInfoGeneral?.data?.devices[0]?.status} />
							<RowInformation title='Estado' info={travelInfoGeneral?.data?.devices[0]?.status} />
							<RowInformation title='Estado' info={travelInfoGeneral?.data?.devices[0]?.status} />
						</div>
					</SectionCard>
				</div>
			</div>
		</div>
	)
}
