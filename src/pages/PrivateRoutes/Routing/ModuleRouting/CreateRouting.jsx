import { useState } from 'react'

import { APIProvider } from '@vis.gl/react-google-maps'

import { ErrorComponent, InputComponent, InputSubmitComponent, LoaderComponent } from '../../../../Components'
import { MapGoogle } from '../../../../Components/mapGoogle/Map'
import { MapHandler } from '../../../../Components/mapGoogle/MapHandler'
import { PlaceAutocompleteClassic } from '../../../../Components/mapGoogle/PlaceAutocompleteClassic'
import { API_KEY_GOOGLE_MAPS } from '../../constants/constants'
import { useRouting } from './hooks/useRouting'

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

	return (
		<div className='h-[95%]'>
			<APIProvider apiKey={API_KEY_GOOGLE_MAPS}>
				<MapHandler place={selectedPlace} />
				<div className='flex h-full'>
					{/* MAP */}
					<div className='w-[40%]'>
						<MapGoogle
							permissionsData={permissionsData?.data.data}
							state={state}
							dispatch={dispatch}
							locations={objectLocations}
							dataPrintModals={state?.now}
							setDataDirections={setDataDirections}
							UndoRedoControlPermission
							handleChangePermissions={handleChangePermissions}
							handleChangeMarkerDraggable={handleChangeMarkerDraggable}
							withDirecton={true}
						/>
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
