import React, { useEffect, useRef, useState } from 'react'

import { GetPlaceCommand, LocationClient, SearchPlaceIndexForSuggestionsCommand } from '@aws-sdk/client-location'
import { withAPIKey } from '@aws/amazon-location-utilities-auth-helper'
import { placeToFeatureCollection } from '@aws/amazon-location-utilities-datatypes'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MapLibreSearchControl } from '@stadiamaps/maplibre-search-box'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import maplibregl from 'maplibre-gl'
import { useForm } from 'react-hook-form'

import '@stadiamaps/maplibre-search-box/dist/style.css'
import 'maplibre-gl/dist/maplibre-gl.css'

const apiKey =
	'v1.public.eyJqdGkiOiI0NjIwOTNmZC0yNTczLTRkNGYtYTMzMy00ZDIxMjQyMjFhN2QifSdisRzSAXgylyOLTZlGfVKYs4S5XWyU-0aND7iXmXZtZ0OCDMQp0-1wE2N3tYnwisGA4xq2H-09At0ZjyZTfHo2wZMNVFizy1clnBh42I_t6re_y3y0TlncD7t5FqoOuXVVRwPcHggJV3MR2yqGKyD4Kx7Sl9hvx6hh_1R3JZ9DHD-ny-a_CPPnZ5SLMGjaccWNn8FWJIWYba5nr6NO6hORDltKHVM-2zbqAyoCojEEYlRLtVWcti2t5Y_R-8e4p1wOQTBoPqphDDesOryt79wAYYyrxvigW7T8L1B3fkjmS5Cgj-a6_zaW_KfXHj7pwLWKip3TCAImGEtghLg-N7I.ZTA0NDFlODYtNGY5Mi00NWU4LTk1MDgtMmY4YmViYWFhYjUz'

export const CreateService = () => {
	const { register, handleSubmit } = useForm()
	const [value, setValue] = useState(dayjs('2022-04-17T15:30'))
	var formattedDate = format(value.$d, 'yyyy-MM-dd hh:mm:ss')

	const [valueSum, setValueSum] = useState(0)

	const mapContainer = useRef(null)
	const map = useRef(null)
	const [lng, setLng] = useState(null)
	const [lat, setLat] = useState(null)
	const [zoom] = useState(10)
	const mapName = 'explore.map.Here'
	const region = 'sa-east-1'
	const [mapGlobal, setMapGlobal] = useState(null)

	const control = new MapLibreSearchControl({
		useMapFocusPoint: true,
		onResultSelected: (res) => {
			console.log(res)
			changeLatAndLng(res?.geometry?.coordinates[1], res?.geometry?.coordinates[0])
		}
	})

	useEffect(() => {
		const mapControl = (map.current = new maplibregl.Map({
			container: mapContainer.current,
			style: `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`,
			center: [lng, lat],
			zoom: zoom
		}))

		mapControl.on('click', (event) => {
			setLng(event.lngLat.lng)
			setLat(event.lngLat.lat)
		})
		mapControl.addControl(control, 'top-left')
		setMapGlobal(mapControl)
	}, [])

	useEffect(() => {
		if (mapGlobal) {
			new maplibregl.Marker({}).setLngLat([lng, lat]).addTo(mapGlobal)
		}
	}, [lng, lat])

	const changeLatAndLng = (lat, lng) => {
		setLng(lng)
		setLat(lat)
	}

	return (
		<div className='pt-10'>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
					<DateTimePicker label='fecha de inicio' value={value} onChange={(newValue) => setValue(newValue)} />
					<DateTimePicker label='fecha de final' value={value} onChange={(newValue) => setValue(newValue)} />
				</DemoContainer>
			</LocalizationProvider>
			<form action=''>
				<div>
					<div className=' pt-32'>
						<div className='map-wrap'>
							<div ref={mapContainer} className='w-2/3 h-80 bg-black' />
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}

// ;<InputComponent
// 	required
// 	name='email'
// 	type='email'
// 	svg={emailSvg}
// 	register={register}
// 	label='Correo electronico'
// 	placeholder='name@gmail.com'
// />
// {
// 	/* <InputComponent
// 					required
// 					name='license_plate'
// 					type='text'
// 					svg={emailSvg}
// 					register={register}
// 					label='Placa'
// 					placeholder='XXXXX'
// 				/>
// 				<InputComponent
// 					required
// 					name='name'
// 					type='text'
// 					svg={emailSvg}
// 					register={register}
// 					label='Nombre'
// 					placeholder='jhondue'
// 				/>
// 				<InputComponent
// 					required
// 					name='number_document'
// 					type='number'
// 					svg={emailSvg}
// 					register={register}
// 					label='numero de documento'
// 					placeholder='000 000 0000'
// 				/> */
// }
