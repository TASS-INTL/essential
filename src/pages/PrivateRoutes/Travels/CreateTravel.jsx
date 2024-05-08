import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'

import { SelectComponent } from '../../../Components'
import { Map } from '../components/Map'
import { useMap } from '../Hooks/useMap'
import { useTravels } from './hooks/useTravels'

const objKeys = [{ name: 'place_start' }, { name: 'place_end' }]

export const CreateTravel = () => {
	const { fetchDataInfoRegister } = useTravels()
	const dataInfoRegister = fetchDataInfoRegister()
	const { createMarkerMap, setMapGlobal, mapGlobal } = useMap()

	const { register, handleSubmit, watch } = useForm()

	const [markers, setMarkers] = useState([])

	useEffect(() => {
		if (dataInfoRegister?.data?.data?.services[0] && mapGlobal !== null) {
			const filter = dataInfoRegister?.data?.data?.services.filter((word) => word._id === watch().service.did)
			if (filter.length > 0) {
				objKeys.map((item) => {
					const marker = createMarkerMap(
						filter[0]?.[item.name]?.location?.coordinates[0],
						filter[0]?.[item.name]?.location?.coordinates[1],
						mapGlobal,
						false
					)
					// setMarkers(...markers, { marker: markers })
				})
			}
		}
	}, [dataInfoRegister, mapGlobal, watch().service])

	return (
		<div>
			<h1 className='font-normal py-4 flex justify-center '>Creacion de viaje</h1>

			<SelectComponent
				color
				register={register}
				label='Selecciona el servicio'
				name='service.did'
				arrayOptions={dataInfoRegister?.data?.data?.services}
				option='did'
			/>
			<Map setMapGlobal={setMapGlobal} />
			<SelectComponent
				color
				register={register}
				label='Selecciona el dispositivo'
				name='device.id_device'
				arrayOptions={dataInfoRegister?.data?.data?.devices}
				option='nickname'
			/>
			<SelectComponent
				color
				register={register}
				label='Selecciona el instalador'
				name='installer.id_installer'
				arrayOptions={dataInfoRegister?.data?.data?.installers}
				option='name'
			/>
		</div>
	)
}
