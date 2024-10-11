import { APIProvider } from '@vis.gl/react-google-maps'

import { useRouting } from './hooks/useRouting'
import { Fragment } from 'react'
import { ErrorComponent, InputComponent, InputSubmitComponent, LoaderComponent } from '@/Components'
import { API_KEY_GOOGLE_MAPS } from '../../constants/constants'
import { MapGoogle } from '@/Components/mapGoogle/Map'
import { Directions } from '@/Components/mapGoogle/Directions'
import { MarkerWithInfowindow } from '@/Components/mapGoogle/MarkerWithInfowindow'
import { InfoWindowComponent } from '@/Components/mapGoogle/InfoWindowComponent'
import { PlaceAutocompleteClassic } from '@/Components/mapGoogle/PlaceAutocompleteClassic'


export const CreateRouting = () => {
	const {
		state,
		dispatch,
		register,
		addPlaces,
		handleSubmit,
		selectedPlace,
		handleSendData,
		objectLocations,
		setDataDirections,
		permissionsData,
		handleChangePermissions,
		handleChangeMarkerDraggable
	} = useRouting()

	if (permissionsData.isLoading) return <LoaderComponent />

	if (permissionsData.error || permissionsData.data?.error)
		return <ErrorComponent error={permissionsData.data?.message} />

	const changeStatePermission = (idPermission) => {
		const position = state.now.findIndex((element) => element._id === idPermission)
		state.now[position].showPermission = false
	}

	return (
		<div className='h-[95%]'>
			<APIProvider apiKey={API_KEY_GOOGLE_MAPS}>
				<div className='flex h-full'>
					{/* MAP */}
					<div className='w-[40%]'>
						<MapGoogle
							state={state}
							dispatch={dispatch}
							selectedPlace={selectedPlace}
							UndoRedoControlPermission
						>
							{!!objectLocations?.location_start?.name && objectLocations?.location_end?.name && (
								<Directions
									origin={objectLocations.location_start.name}
									destination={objectLocations.location_end.name}
									setDataDirections={setDataDirections}
								/>
							)}
							{/* marker and geofence of the location start */}
							{!!objectLocations?.location_start?.market?.location?.coordinates[0] && (
								<MarkerWithInfowindow
									position={{
										lat: objectLocations?.location_start?.market?.location?.coordinates[1],
										lng: objectLocations?.location_start?.market?.location?.coordinates[0]
									}}
									location='location_start'
									permissionsData={permissionsData}
									handleChangePermissions={handleChangePermissions}
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
									permissionsData={permissionsData}
									handleChangePermissions={handleChangePermissions}
									handleChangeMarkerDraggable={handleChangeMarkerDraggable}
								/>
							)}
							{/* permissions modal in the geofences */}
							{!!state?.now &&
								state?.now?.map((item) => (
									<Fragment key={item}>
										{item.showPermission && (
											<InfoWindowComponent
												key={item._id}
												maxWidth={400}
												onCloseClick={() => changeStatePermission(item._id)}
												permission={permissionsData?.data?.data}
												position={{
													lat: item.snapshot.path[0].lat(),
													lng: item.snapshot.path[0].lng()
												}}
											/>
										)}
									</Fragment>
								))}
						</MapGoogle>
					</div>
					{/* FORM */}
					<form onSubmit={handleSubmit(handleSendData)} className='w-[60%] overflow-y-scroll'>
						<div className='flex gap-4 mt-5'>
							<div className='w-[30%]'>
								<InputComponent
									required
									name='name_routing'
									type='text'
									register={register}
									label='Nombre de la ruta'
									placeholder='Medellin - la guajira'
									color
								/>
							</div>
							<div className='w-[30%]'>
								<span className='mb-3'>Lugar de inicio</span>
								<PlaceAutocompleteClassic addPlaces={addPlaces} location='location_start' />
							</div>
							<div className='w-[30%]'>
								<span className='mb-3'>Lugar de fin</span>
								<PlaceAutocompleteClassic addPlaces={addPlaces} location='location_end' />
							</div>
						</div>
						<div className='flex justify-center pt-6 '>
							<InputSubmitComponent text='Crear Ruta' />
						</div>
					</form>
				</div>
			</APIProvider>
		</div>
	)
}
