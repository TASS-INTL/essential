import React from 'react'

import { ErrorComponent, InputSubmitComponent, LoaderComponent, RemarksInput, SelectComponent } from '@/Components'
import { MapGoogle } from '@/Components/mapGoogle/Map'
import { MarkerWithInfowindow } from '@/Components/mapGoogle/MarkerWithInfowindow'
import { PlaceAutocompleteClassic } from '@/Components/mapGoogle/PlaceAutocompleteClassic'
import { Polygon } from '@/Components/mapGoogle/Polygon'
import { Polyline } from '@/Components/mapGoogle/Polyline'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { APIProvider } from '@vis.gl/react-google-maps'

import { API_KEY_GOOGLE_MAPS } from '../../constants/constants'
import { useCreateTravel } from './hooks/useCreateTravel'

export const CreateTravel = ({ dataForm }) => {
	const {
		dateEnd,
		register,
		dateStart,
		addPlaces,
		setDateEnd,
		setDateStart,
		handleSubmit,
		selectedPlace,
		dataPreCrateTravel,
		handleCreateTravel,
		serviceRouteInformation,
		objectLocations,
		handleChangePermissionsForLocationStartAndEnd,
		handleChangeMarkerDraggable
	} = useCreateTravel(dataForm)

	if (dataPreCrateTravel.isLoading) return <LoaderComponent />

	if (dataPreCrateTravel.error || dataPreCrateTravel.data?.error)
		return <ErrorComponent error={dataPreCrateTravel.data?.message} />

	return (
		<APIProvider apiKey={API_KEY_GOOGLE_MAPS}>
			<div className='h-[95%]'>
				<div className='flex h-full'>
					<div className='w-[40%]'>
						<MapGoogle width='95%' selectedPlace={selectedPlace}>
							{!!objectLocations?.location_start?.market?.location?.coordinates[0] && (
								<MarkerWithInfowindow
									position={{
										lat: objectLocations?.location_start?.market?.location?.coordinates[1],
										lng: objectLocations?.location_start?.market?.location?.coordinates[0]
									}}
									location='location_start'
									permissionsData={
										objectLocations.location_start.permissions
											? objectLocations.location_start.permissions
											: dataPreCrateTravel?.data?.data?.permissions
									}
									handleChangePermissions={handleChangePermissionsForLocationStartAndEnd}
									handleChangeMarkerDraggable={handleChangeMarkerDraggable}
								/>
							)}
							{/* marker and geofence of the location end */}
							{!!objectLocations?.location_end?.market?.location?.coordinates[1] && (
								<MarkerWithInfowindow
									position={{
										lat: objectLocations?.location_end?.market?.location?.coordinates[1],
										lng: objectLocations?.location_end?.market?.location?.coordinates[0]
									}}
									location='location_end'
									permissionsData={
										objectLocations.location_end.permissions
											? objectLocations.location_end.permissions
											: dataPreCrateTravel?.data?.data?.permissions
									}
									handleChangePermissions={handleChangePermissionsForLocationStartAndEnd}
									handleChangeMarkerDraggable={handleChangeMarkerDraggable}
								/>
							)}
							{!!serviceRouteInformation?.data?.data?.coordinatesroute && (
								<Polyline
									strokeWeight={7}
									strokeColor={'#8a2be2'}
									pathArray={serviceRouteInformation?.data?.data?.coordinatesroute}
								/>
							)}
							{!!serviceRouteInformation?.data?.data?.stations?.length > 0 && (
								<>
									{serviceRouteInformation?.data?.data?.stations.map((item) => (
										<Polygon
											key={item._id}
											strokeWeight={1.5}
											pathsArray={item?.location?.coordinates[0]}
										/>
									))}
								</>
							)}
							{!!serviceRouteInformation?.data?.data?.location_start && (
								<Polygon
									strokeWeight={1.5}
									pathsArray={
										serviceRouteInformation?.data?.data?.location_start?.location.coordinates[0]
									}
								/>
							)}
							{!!serviceRouteInformation?.data?.data?.location_end && (
								<Polygon
									strokeWeight={1.5}
									pathsArray={
										serviceRouteInformation?.data?.data?.location_end?.location.coordinates[0]
									}
								/>
							)}
						</MapGoogle>
					</div>
					<div className='w-[60%] overflow-y-scroll'>
						<form onSubmit={handleSubmit(handleCreateTravel)} className='flex flex-col'>
							{/* DATES */}
							<div className='flex mt-3'>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer class='flex' components={['DateTimePicker', 'DateTimePicker']}>
										<div className='flex gap-5'>
											<DateTimePicker
												label='Fecha de Instalacion'
												value={dateStart}
												onChange={(newValue) => setDateStart(newValue)}
											/>
											<DateTimePicker
												label='Fecha de Desinstalacion'
												value={dateEnd}
												onChange={(newValue) => setDateEnd(newValue)}
											/>
										</div>
									</DemoContainer>
								</LocalizationProvider>
							</div>
							{/* INPUTS TRAVELS */}
							<div className='flex mt-3  justify-between'>
								<div className='w-[99%]'>
									<SelectComponent
										required
										color
										option='did'
										name='service._id'
										register={register}
										label='Selecciona el servicio'
										arrayOptions={dataPreCrateTravel?.data?.data?.services}
									/>
								</div>
							</div>
							{/* INPUTS TYPE TREVEL */}
							<div className='flex mt-3 gap-4 '>
								<div className='w-[99%]'>
									<SelectComponent
										required
										color
										register={register}
										label='Selecciona el tipo de viaje'
										name='type._id'
										arrayOptions={dataPreCrateTravel?.data?.data?.types_travel}
										option='name'
									/>
								</div>
							</div>
							{/* INPUTS INTALLER */}
							<div className='flex mt-3 gap-4 '>
								<div className='w-[48%]'>
									<SelectComponent
										required
										color
										register={register}
										label='Selecciona el instalador'
										name='installers.id_installer'
										arrayOptions={dataPreCrateTravel?.data?.data?.installers}
										option='name'
									/>
								</div>
								<div className='w-[48%]'>
									<SelectComponent
										required
										color
										register={register}
										label='Selecciona la operacion'
										name='installers.type_operation'
										arrayOptions={dataPreCrateTravel?.data?.data?.type_operations}
										option='name'
									/>
								</div>
							</div>
							{/* INPUTS PLACES */}
							<div className='flex gap-4 mt-3'>
								<div className='w-[48%]'>
									<span className='mb-3'>Lugar de Instalacion</span>
									<PlaceAutocompleteClassic addPlaces={addPlaces} location='location_start' />
								</div>
								<div className='w-[48%]'>
									<span className='mb-3'>Lugar de Desinstalacion</span>
									<PlaceAutocompleteClassic addPlaces={addPlaces} location='location_end' />
								</div>
							</div>
							{/* COMENTS SERVICE */}
							<RemarksInput
								text='Quieres dar alguna indicacion adicional ?'
								register={register}
								nameRegister='remarks'
							/>
							{/* SEND FORM */}
							<div className='flex justify-center pt-6 '>
								<InputSubmitComponent text='CREAR VIAJE' />
							</div>
						</form>
					</div>
				</div>
			</div>
		</APIProvider>
	)
}
