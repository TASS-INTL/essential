import React from 'react'
import { useEffect, useState } from 'react'
import { padlockClose, padlockOpen } from '@/assets/assetsplatform'
import { LoaderComponent, RowInformation, SectionCard } from '@/Components'
import { arrayTapMonitoring, TapBottons } from '@/Components/TapBottons'
import { trimText } from '@/helpers/routes'
import { travelsStore } from '@/store/travelsStore'
import { useLocation, useParams } from 'react-router-dom'
import { travelInfoStore } from '@/store/travels/travelInfoStore'
import { QrCodeScannerOutlined } from '@mui/icons-material'

export const GeneralTravel = () => {
    const location = useLocation()
    const { idTravel } = useParams()
    const travelInfo = travelsStore((state) => state.travelInfo)
    const travelInfoGeneral = travelInfoStore((state) => state.general)
    const setTravelInfoGeneral = travelInfoStore((state) => state.setGeneral)

    if (travelInfoGeneral === null) return <LoaderComponent />

    const handleClickGeofence = (geofenceName) => {
        console.log('Geofence clicked:', geofenceName);
        
        // Crear una copia profunda del objeto para no mutar el estado directamente
        const updatedData = JSON.parse(JSON.stringify(travelInfoGeneral));
        
        // Actualizar la selección para location_installation
        if (updatedData.data.location_installation) {
            updatedData.data.location_installation.select = 
                updatedData.data.location_installation.name === geofenceName;
        }
        
        // Actualizar la selección para location_finalization
        if (updatedData.data.location_finalization) {
            updatedData.data.location_finalization.select = 
                updatedData.data.location_finalization.name === geofenceName;
        }
        
        // Actualizar el estado
        setTravelInfoGeneral(updatedData);
    };

    const handleUpdateGeofenceOrder = (id, newOrder) => {
		const order = parseInt(newOrder);
		if (isNaN(order)) return;
		
		
	};

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
					<div className='flex flex-col'>
						<div className="mt-1 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 p-2">
						{travelInfoGeneral?.data.location_finalization && (
                                    <div 
                                        key={travelInfoGeneral?.data.location_finalization.id} 
                                        className={`bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-all duration-300 border ${
                                            travelInfoGeneral?.data.location_finalization.select 
                                                ? 'border-blue-500 ring-2 ring-blue-200' 
                                                : 'border-gray-200'
                                        } cursor-pointer`}
                                        onClick={() => handleClickGeofence(travelInfoGeneral?.data.location_finalization.name)}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex-1">
                                                {travelInfoGeneral?.data.location_finalization.info.editable ? (
                                                    <input
                                                        type="text"
                                                        value={travelInfoGeneral?.data.location_finalization.name}
                                                        onChange={(e) => handleUpdateGeofenceName(travelInfoGeneral?.data.location_finalization.name, e.target.value)}
                                                        className="w-full px-2 py-1 text-lg font-semibold border rounded focus:outline-none focus:border-blue-500"
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                ) : (
                                                    <h3 className={`text-lg font-semibold ${
                                                        travelInfoGeneral?.data.location_finalization.select ? 'text-blue-600' : 'text-gray-800'
                                                    }`}>
                                                        {travelInfoGeneral?.data.location_finalization.name}
                                                    </h3>
                                                )}
                                                {(travelInfoGeneral?.data.location_finalization.name === 'location_start' || travelInfoGeneral?.data.location_finalization.name === 'location_end') && (
                                                    <span className="text-xs text-gray-500">
                                                        {travelInfoGeneral?.data.location_finalization.name === 'location_start' ? 'Punto de inicio' : 'Punto final'}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={travelInfoGeneral?.data.location_finalization.info.editable}
                                                        onChange={() => handleToggleEdit(id)}
                                                        className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                    <span className="ml-2 text-sm text-gray-600">Edit</span>
                                                </label>
                                                {travelInfoGeneral?.data.location_finalization.name !== 'location_start' && travelInfoGeneral?.data.location_finalization.name !== 'location_end' && (
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
                                                {travelInfoGeneral?.data.location_finalization.info.editable ? (
                                                    <input
                                                        type="number"
                                                        value={travelInfoGeneral?.data.location_finalization.info.order}
                                                        min="1"
                                                        onChange={(e) => handleUpdateGeofenceOrder(id, e.target.value)}
                                                        className="w-20 px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                ) : (
                                                    <span>{travelInfoGeneral?.data.location_finalization.info.order}</span>
                                                )}
                                            </div>
                                            <p>Type: {travelInfoGeneral?.data.location_finalization.type}</p>
                                            {travelInfoGeneral?.data.location_finalization.type === 'Circle' && (
                                                <p>Radius: {travelInfoGeneral?.data.location_finalization.info.radius}m</p>
                                            )}
                                            {travelInfoGeneral?.data.location_finalization.info.name_map && (
                                                <p className="text-xs text-gray-500 mt-1 truncate" title={travelInfoGeneral?.data.location_finalization.info.name_map}>
                                                    {travelInfoGeneral?.data.location_finalization.info.name_map}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                        )}
						{travelInfoGeneral?.data.location_installation && (
                                    <div 
                                        key={travelInfoGeneral?.data.location_installation.id} 
                                        className={`bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-all duration-300 border ${
                                            travelInfoGeneral?.data.location_installation.select 
                                                ? 'border-blue-500 ring-2 ring-blue-200' 
                                                : 'border-gray-200'
                                        } cursor-pointer`}
                                        onClick={() => handleClickGeofence(travelInfoGeneral?.data.location_installation.name)}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex-1">
                                                {travelInfoGeneral?.data.location_installation.info.editable ? (
                                                    <input
                                                        type="text"
                                                        value={travelInfoGeneral?.data.location_installation.name}
                                                        onChange={(e) => handleUpdateGeofenceName(travelInfoGeneral?.data.location_installation.name, e.target.value)}
                                                        className="w-full px-2 py-1 text-lg font-semibold border rounded focus:outline-none focus:border-blue-500"
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                ) : (
                                                    <h3 className={`text-lg font-semibold ${
                                                        travelInfoGeneral?.data.location_installation.select ? 'text-blue-600' : 'text-gray-800'
                                                    }`}>
                                                        {travelInfoGeneral?.data.location_installation.name}
                                                    </h3>
                                                )}
                                                {(travelInfoGeneral?.data.location_installation.name === 'location_start' || travelInfoGeneral?.data.location_installation.name === 'location_end') && (
                                                    <span className="text-xs text-gray-500">
                                                        {travelInfoGeneral?.data.location_installation.name === 'location_start' ? 'Punto de inicio' : 'Punto final'}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={travelInfoGeneral?.data.location_installation.info.editable}
                                                        onChange={() => handleToggleEdit(travelInfoGeneral?.data.location_installation.name)}
                                                        className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                    <span className="ml-2 text-sm text-gray-600">Edit</span>
                                                </label>
                                                {travelInfoGeneral?.data.location_installation.name !== 'location_start' && travelInfoGeneral?.data.location_installation.name !== 'location_end' && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteGeofence(travelInfoGeneral?.data.location_installation.name);
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
                                                {travelInfoGeneral?.data.location_installation.info.editable ? (
                                                    <input
                                                        type="number"
                                                        value={travelInfoGeneral?.data.location_installation.info.order}
                                                        min="1"
                                                        onChange={(e) => handleUpdateGeofenceOrder(travelInfoGeneral?.data.location_installation.name, e.target.value)}
                                                        className="w-20 px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                ) : (
                                                    <span>{travelInfoGeneral?.data.location_installation.info.order}</span>
                                                )}
                                            </div>
                                            <p>Type: {travelInfoGeneral?.data.location_installation.type}</p>
                                            {travelInfoGeneral?.data.location_installation.type === 'Circle' && (
                                                <p>Radius: {travelInfoGeneral?.data.location_installation.info.radius}m</p>
                                            )}
                                            {travelInfoGeneral?.data.location_installation.info.name_map && (
                                                <p className="text-xs text-gray-500 mt-1 truncate" title={travelInfoGeneral?.data.location_installation.info.name_map}>
                                                    {travelInfoGeneral?.data.location_installation.info.name_map}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                        )}
						</div>
					</div>
					
					{/* Devices */}
					{/* <SectionCard>
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
					</SectionCard> */}
					{/* Installers */}
					{/* <SectionCard>
						<h2 className='text-sm font-bold text-start pb-3'>Operaciones</h2>
						<div className='flex flex-col'>
							<RowInformation title='Estado' info={travelInfoGeneral?.data?.devices[0]?.status} />
							<RowInformation title='Estado' info={travelInfoGeneral?.data?.devices[0]?.status} />
							<RowInformation title='Estado' info={travelInfoGeneral?.data?.devices[0]?.status} />
							<RowInformation title='Estado' info={travelInfoGeneral?.data?.devices[0]?.status} />
							<RowInformation title='Estado' info={travelInfoGeneral?.data?.devices[0]?.status} />
						</div>
					</SectionCard> */}
				</div>
			</div>
		</div>
	)
}
