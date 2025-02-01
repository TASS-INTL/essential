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

import { useState } from 'react'

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
		handleChangeRadiusCircle,
		handleChangePermissionsForLocationStartAndEnd,
		handleChangeMarkerDraggable,
		setSelectedInstallers,
		selectedInstallers,
		hendleServiceRoute
	} = useCreateTravel(dataForm)
	// Add this state near your other const declarations

	// Add these states at the top with other states
	const [selectedInstaller, setSelectedInstaller] = useState(null)
	const [selectedOperation, setSelectedOperation] = useState(null)

	// Modify the installer selection handler
	// Remove duplicate declaration and merge functionality
	// Modify the handlers to only set the state
	const handleInstallerSelectionAndAdd = (e) => {
		const installerId = e.target.value
		const installer = dataPreCrateTravel?.data?.data?.installers.find(
			inst => inst._id === installerId
		)
		console.log("Selected Installer", selectedInstaller)
		setSelectedInstaller(installer)
	}

	const handleOperationSelection = (e) => {
		const operationId = e.target.value
		const operation = dataPreCrateTravel?.data?.data?.type_operations.find(
			op => op._id === operationId
		)
		console.log("Selected Operation", selectedOperation)
		setSelectedOperation(operation)
	}

	// Add new function to handle the addition of installer with operation
	const handleAddInstallerWithOperation = () => {
		if (selectedInstaller && selectedOperation) {
			const newInstaller = {
				...selectedInstaller,
				operation: selectedOperation
			}
			if (!selectedInstallers.find(si => si._id === selectedInstaller._id)) {
				setSelectedInstallers([...selectedInstallers, newInstaller])
				// Reset selections after adding
				setSelectedInstaller(null)
				setSelectedOperation(null)
			}
		}
	}

	const handleAddInstaller = () => {
		if (selectedInstaller && selectedOperation) {
			const newInstaller = {
				...selectedInstaller,
				operation: selectedOperation
			}
			setSelectedInstallers([...selectedInstallers, newInstaller])
			// Reset selections after adding
			setSelectedInstaller(null)
			setSelectedOperation(null)
		}
	}

	// Add this function to handle installer selection
	const handleInstallerSelection = (e) => {
		const installerId = e.target.value
		const installer = dataPreCrateTravel?.data?.data?.installers.find(
			inst => inst._id === installerId
		)
		if (installer && !selectedInstallers.find(si => si._id === installerId)) {
			setSelectedInstallers([...selectedInstallers, installer])
		}
	}

	// Add this function to remove installers
	const removeInstaller = (installerId) => {
		setSelectedInstallers(selectedInstallers.filter(inst => inst._id !== installerId))
	}



	if (dataPreCrateTravel.isLoading) return <LoaderComponent />

	if (dataPreCrateTravel.error || dataPreCrateTravel.data?.error)
		return <ErrorComponent error={dataPreCrateTravel.data?.message} />

	console.log("DataPreCrateTravel", dataPreCrateTravel)

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
									handleChangeRadiusCircle={handleChangeRadiusCircle}
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
									handleChangeRadiusCircle={handleChangeRadiusCircle}
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
											draggable
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
									editable
									draggable
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
										onChange={(e) => {
											hendleServiceRoute(e.target.value)
										}}
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
							<div className='flex mt-3 gap-4 flex-col'>
								<div className='flex gap-4'>
									<div className='w-[48%]'>
										<SelectComponent
											required
											color
											register={register}
											label='Selecciona el instalador'
											name='installers.id_installer'
											arrayOptions={dataPreCrateTravel?.data?.data?.installers}
											option='name'
											onChange={handleInstallerSelectionAndAdd}
											value={selectedInstaller?._id || ''}
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
											onChange={handleOperationSelection}
											value={selectedOperation?._id || ''}
										/>
									</div>
								</div>
								<div className='flex justify-end mt-2'>
									<button
										type="button"
										onClick={handleAddInstallerWithOperation}
										disabled={!selectedInstaller || !selectedOperation}
										className={`px-4 py-2 rounded-lg ${selectedInstaller && selectedOperation
												? 'bg-blue-600 hover:bg-blue-700 text-white'
												: 'bg-gray-300 text-gray-500 cursor-not-allowed'
											} transition-colors`}
									>
										Agregar Instalador
									</button>
								</div>

								{selectedInstallers.length > 0 && (
									<div className='w-full p-4 border rounded-lg mt-4'>
										<h3 className='font-semibold mb-2'>Instaladores Seleccionados:</h3>
										<div className='space-y-2'>
											{selectedInstallers.map((installer) => (
												<div key={installer._id} className='flex items-center justify-between bg-gray-50 p-2 rounded'>
													<div>
														<span className="font-medium">{installer.name}</span>
														<span className="text-gray-500 ml-2">- {installer.operation.name}</span>
													</div>
													<button
														type="button"
														onClick={() => removeInstaller(installer._id)}
														className='text-red-500 hover:text-red-700'
													>
														✕
													</button>
												</div>
											))}
										</div>
									</div>
								)}


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
