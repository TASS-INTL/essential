import { Fragment, useState } from 'react'
import { showToast } from '@/helpers/toast'
import { ErrorComponent, InputComponent, InputSubmitComponent, LoaderComponent } from '@/Components'
import { Directions } from '@/Components/mapGoogle/Directions'
import { InfoWindowComponent } from '@/Components/mapGoogle/InfoWindowComponent'
import { MapGoogle } from '@/Components/mapGoogle/Map'
import { MarkerWithInfowindow } from '@/Components/mapGoogle/MarkerWithInfowindow'
import { PlaceAutocompleteClassic } from '@/Components/mapGoogle/PlaceAutocompleteClassic'
import { APIProvider } from '@vis.gl/react-google-maps'
import { GeofenceMapComponent } from '../ModuleGeofence/GeofenceMapComponent'


import { API_KEY_GOOGLE_MAPS } from '../../constants/constants'
import { useRouting } from './hooks/useRouting'

export const CreateRouting = () => {
	const {
		state,
		dispatch,
		register,
		handleAddGeofence,
		addPlaces,
		geofences,
		handleSubmit,
		selectedPlace,
		handleSendData,
		objectLocations,
		permissionsData,
		setDataDirections,
		changeStatePermission,
		handleChangeRadiusCircle,
		handleChangePermissionForGeoFences,
		handleChangePermissionsForLocationStartAndEnd,
		handleChangeMarkerDraggable,
		setGeofences,
		setSelectedPlace
	} = useRouting()


	if (permissionsData.isLoading) return <LoaderComponent />

	if (permissionsData.error || permissionsData.data?.error)
		return <ErrorComponent error={permissionsData.data?.message} />

	const handleUpdatePolygon = (id) => (data) => {
		console.log("data lats lngs", data)
		const locationCoordinates = []
		data.coordinates.forEach((coordinate) => {
			locationCoordinates.push([coordinate.lng, coordinate.lat])
		})
		setGeofences(prev => ({
			...prev,
			[id]: {
				...prev[id],
				location: {
					...prev[id].location,
					coordinates: [locationCoordinates]
				}
			}
		}));


	}

	const handleClickGeo = () => {
        console.log("Clic geo")
	}

	const handleUpdateGeofenceName = (id, newName) => {
		setGeofences(prev => ({
			...prev,
			[id]: {
				...prev[id],
				name: newName
			}
		}));
	};
	
	const handleUpdateGeofenceOrder = (id, newOrder) => {
		const order = parseInt(newOrder);
		if (isNaN(order)) return;
		
		setGeofences(prev => ({
			...prev,
			[id]: {
				...prev[id],
				info: {
					...prev[id].info,
					order: order
				}
			}
		}));
	};

	const findGeofenceByName = (name) => {
		return Object.values(geofences).find(geo => geo.name === name);
	};
    const handleUpdateGeoCircle = (id) => (data) => {
        const { center, type } = data;
        setGeofences(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                info: {
                    ...prev[id].info,
                    coordinates_center: [center.lng, center.lat]
                },
                market: {
                    ...prev[id].market,
                    location: {
                        ...prev[id].market.location,
                        coordinates: [center.lng, center.lat]
                    }
                }
            }
        }));
    };

    const handleClickGeofence = (id) => {
        setGeofences(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
				info: {
                   ...prev[id].info,
                    editable:!prev[id].info.editable
				},
                select: !prev[id].select
            }
        }));
    };

    const handleToggleEdit = (id) => {
        setGeofences(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                info: {
                    ...prev[id].info,
                    editable: !prev[id].info.editable
                },
				select: !prev[id].select
            }
        }));
    };

	const handleSavePermissions = ({geofenceId, permissions}) => {
		console.log("permisossssssss: ", geofenceId, permissions)
		setGeofences(prev => ({
           ...prev,
            [geofenceId]: {
               ...prev[geofenceId],
                permissions: permissions,
                info: {
                    ...prev[geofenceId].info,
                    editable:!prev[geofenceId].info.editable
                },
				select:!prev[geofenceId].select
            }
        }));
    }

	const handleClosePermissions = ({geofenceId}) => {
        setGeofences(prev => ({
          ...prev,
            [geofenceId]: {
              ...prev[geofenceId],
                info: {
                   ...prev[geofenceId].info,
                    editable:!prev[geofenceId].info.editable
                },
				select: !prev[geofenceId].select
            }
        }));
	}

    const handleDeleteGeofence = (id) => {
        const geofence = geofences[id];
        // Don't allow deletion of start and end locations
        if (geofence.name === 'location_start' || geofence.name === 'location_end') {
            showToast('No se pueden eliminar los puntos de inicio y fin', 'warning');
            return;
        }

        setGeofences(prev => {
            const newGeofences = { ...prev };
            delete newGeofences[id];
            return newGeofences;
        });
    };
    return (
        <div className='h-[95%]'>
            <APIProvider apiKey={API_KEY_GOOGLE_MAPS}>
                <div className='flex h-full gap-3'>
                    {/* MAP */}
                    <div className='w-[40%]'>
                        <MapGoogle handleFuntionDrawingMap={handleAddGeofence} selectedPlace={selectedPlace} showDrawingManager>
                            {geofences && Object.entries(geofences).length > 0 && Object.entries(geofences).map(([id, geo]) => (
                                <GeofenceMapComponent
                                    key={id}
                                    geofence={geo}
                                    handleUpdateGeoPolygon={handleUpdatePolygon}
                                    handleUpdateGeoCircle={handleUpdateGeoCircle}
                                    handleClickGeo={handleClickGeo}
									permissions={permissionsData.data}
									handleClickSavePermissions={handleSavePermissions}
									handleClickClosePermissions={handleClosePermissions}
									use={true}
                                />
                            ))}
                            // Then modify the Directions section
                            {(() => {
                                const startGeofence = findGeofenceByName('location_start');
                                const endGeofence = findGeofenceByName('location_end');
                                
                                return startGeofence?.info.coordinates_center && 
                                       endGeofence?.info.coordinates_center && (
                                    <Directions
                                        origin={{
                                            lat: startGeofence.info.coordinates_center[1],
                                            lng: startGeofence.info.coordinates_center[0]
                                        }}
                                        destination={{
                                            lat: endGeofence.info.coordinates_center[1],
                                            lng: endGeofence.info.coordinates_center[0]
                                        }}
                                        setDataDirections={setDataDirections}
                                    />
                                );
                            })()}
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
                        {/* geofences */}
                        {geofences && Object.entries(geofences).length > 0 && (
                            <div className='mt-10'>
                                <h2 className='text-center'>Geocercas</h2>
                            </div>
                        )}
                        {geofences && Object.entries(geofences).length > 0 && (
                            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                                {Object.entries(geofences).map(([id, geo]) => (
                                    <div 
                                        key={id} 
                                        className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 border ${
                                            geo.select 
                                                ? 'border-blue-500 ring-2 ring-blue-200' 
                                                : 'border-gray-200'
                                        } cursor-pointer`}
                                        onClick={() => handleClickGeofence(id)}
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex-1">
                                                {geo.info.editable ? (
                                                    <input
                                                        type="text"
                                                        value={geo.name}
                                                        onChange={(e) => handleUpdateGeofenceName(id, e.target.value)}
                                                        className="w-full px-2 py-1 text-lg font-semibold border rounded focus:outline-none focus:border-blue-500"
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                ) : (
                                                    <h3 className={`text-lg font-semibold ${
                                                        geo.select ? 'text-blue-600' : 'text-gray-800'
                                                    }`}>
                                                        {geo.name}
                                                    </h3>
                                                )}
                                                {(geo.name === 'location_start' || geo.name === 'location_end') && (
                                                    <span className="text-xs text-gray-500">
                                                        {geo.name === 'location_start' ? 'Punto de inicio' : 'Punto final'}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={geo.info.editable}
                                                        onChange={() => handleToggleEdit(id)}
                                                        className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                    <span className="ml-2 text-sm text-gray-600">Edit</span>
                                                </label>
                                                {geo.name !== 'location_start' && geo.name !== 'location_end' && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteGeofence(id);
                                                        }}
                                                        className="p-1 hover:bg-red-100 rounded-full text-red-600 transition-colors duration-200"
                                                        title="Eliminar geocerca"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <p>Order:</p>
                                                {geo.info.editable ? (
                                                    <input
                                                        type="number"
                                                        value={geo.info.order}
                                                        min="1"
                                                        onChange={(e) => handleUpdateGeofenceOrder(id, e.target.value)}
                                                        className="w-20 px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                ) : (
                                                    <span>{geo.info.order}</span>
                                                )}
                                            </div>
                                            <p>Type: {geo.type}</p>
                                            {geo.type === 'Circle' && (
                                                <p>Radius: {geo.info.radius}m</p>
                                            )}
                                            {geo.info.name_map && (
                                                <p className="text-xs text-gray-500 mt-1 truncate" title={geo.info.name_map}>
                                                    {geo.info.name_map}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </form>
                </div>
            </APIProvider>
        </div>
    )
}
