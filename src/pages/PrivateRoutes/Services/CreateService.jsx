import React, { useEffect, useState } from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MapLibreSearchControl } from '@stadiamaps/maplibre-search-box'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'

import { emailSvg } from '../../../assets/assetsplatform'
import { InputSubmitComponent } from '../../../Components'
import { InputComponent } from '../../../Components/InputComponent'
import { Map } from '../components/Map'
import { useMap } from '../Hooks/useMap'

const obj = {
	date_end: '2022-01-01 00:00:00',
	date_start: '2022-01-01 00:00:00',
	driver: {
		email: '',
		license_plate: 'DSA234',
		name: 'name',
		number_document: '123123123',
		phone: '300213123'
	},
	//
	place_end: {
		lat: '',
		lng: '',
		common_name: '',
		country: '',
		county: '',
		region: '',
		geo: {
			type: 'circle',
			coord: ''
		}
	},
	place_start: {
		lat: '',
		lng: '',
		common_name: '',
		country: '',
		county: '',
		region: '',
		geo: {
			type: 'circle',
			coord: ''
		}
	},
	station: [
		{
			lat: '',
			lng: '',
			common_name: '',
			country: '',
			county: '',
			region: '',
			geo: {
				type: 'circle',
				coord: ''
			}
		}
	],
	remarks: 'remarks'
}

export const CreateService = () => {
	const { register, handleSubmit } = useForm()
	const { createCircleRadio, createMarkerMap } = useMap()
	const [dateEnd, setDateEnd] = useState(dayjs('2024-04-17T15:30'))
	const [dateStart, setDateStart] = useState(dayjs('2024-04-17T15:30'))
	const [mapGlobal, setMapGlobal] = useState(null)
	const [dataGlobal, setDataGlobal] = useState(null)
	const [valueFromAdress, setValueFromAdress] = useState(null)
	const [countValueFill, setCountValueFill] = useState(0)
	const [dataCoordinates, setDataCoordinates] = useState({ place_start: {}, place_end: {}, station: [] })

	const control = new MapLibreSearchControl({
		useMapFocusPoint: true,
		mapFocusPointMinZoom: 5,
		onResultSelected: (res) => {
			setValueFromAdress(res)
		}
	})

	useEffect(() => {
		mapGlobal?.addControl(control, 'top-left')
		mapGlobal?.on('click', (e) => {
			const { circle, layer, idLayer } = createCircleRadio(e.lngLat.lng, e.lngLat.lat, mapGlobal)
			const newMarker = createMarkerMap(e.lngLat.lng, e.lngLat.lat, mapGlobal)
			setCountValueFill((state) => state + 1)
			setDataGlobal({ data: { circle, values: e.lngLat } })
			newMarker.on('dragend', () => {
				layer.removeLayer(idLayer)
				const lngLat = newMarker.getLngLat()
				const {
					circle,
					layer: newLayer,
					idLayer: idNewLayer
				} = createCircleRadio(lngLat.lng, lngLat.lat, mapGlobal)
				setDataGlobal({ data: { circle, values: lngLat } })
			})
		})
	}, [mapGlobal])

	useEffect(() => {
		if (valueFromAdress) {
			const value = valueFromAdress.geometry.coordinates
			const { circle, layer, idLayer } = createCircleRadio(value[0], value[1], mapGlobal)
			const newMarker = createMarkerMap(value[0], value[1], mapGlobal)
			setCountValueFill((state) => state + 1)
			setDataGlobal({ data: { circle, values: valueFromAdress } })
			newMarker.on('dragend', () => {
				const lngLat = newMarker.getLngLat()
				layer.removeLayer(idLayer)
				const {
					circle,
					layer: newLayer,
					idLayer: idNewLayer
				} = createCircleRadio(lngLat.lng, lngLat.lat, mapGlobal)
				setDataGlobal({ data: { circle, values: lngLat } })
			})
		}
	}, [valueFromAdress])

	useEffect(() => {
		if (countValueFill > 0) {
			const nameField = countValueFill === 1 ? 'place_start' : countValueFill === 2 ? 'place_end' : 'station'
			if (nameField === 'station') {
				setDataCoordinates((state) => ({ ...state, [nameField]: [...state.station, dataGlobal] }))
			} else {
				setDataCoordinates((state) => ({ ...state, [nameField]: dataGlobal }))
			}
		}
	}, [countValueFill, dataGlobal])

	return (
		<div className='pt-10 overflow-scroll  h-5/6 px-10'>
			<h2 className='pb-5 text-center text-3xl'>Nuevo serivicio</h2>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
					<DateTimePicker
						label='fecha de inicio'
						value={dateStart}
						onChange={(newValue) => setDateStart(newValue)}
					/>
					<DateTimePicker
						label='fecha de final'
						value={dateEnd}
						onChange={(newValue) => setDateEnd(newValue)}
					/>
				</DemoContainer>
			</LocalizationProvider>
			<div className='pt-5'>
				<h4 className='py-4'>Lugar de inicio</h4>
				<Map setMapGlobal={setMapGlobal} />
			</div>
			<form
				onSubmit={handleSubmit((data) => {
					data.date_end = format(dateStart.$d, 'yyyy-MM-dd hh:mm:ss')
					data.date_start = format(dateEnd.$d, 'yyyy-MM-dd hh:mm:ss')
				})}
			>
				<h4 className=' py-5'>Datos del conductor</h4>
				<InputComponent
					required
					name='driver.email'
					type='email'
					svg={emailSvg}
					register={register}
					label='Correo electronico'
					placeholder='name@gmail.com'
					color
				/>
				<InputComponent
					color
					required
					name='driver.license_plate'
					type='text'
					svg={emailSvg}
					register={register}
					label='Placa'
					placeholder='XXXXX'
				/>
				<InputComponent
					color
					required
					name='driver.name'
					type='text'
					svg={emailSvg}
					register={register}
					label='Nombre'
					placeholder='jhondue'
				/>
				<InputComponent
					color
					required
					name='driver.number_document'
					type='number'
					svg={emailSvg}
					register={register}
					label='numero de documento'
					placeholder='000 000 0000'
				/>
				<InputComponent
					color
					required
					name='driver.phone'
					type='number'
					svg={emailSvg}
					register={register}
					label='numero de celular'
					placeholder='000 000 0000'
				/>
				<div className='flex flex-col'>
					<label htmlFor='story'>Quieres dar alguna indicacion adicional:</label>
					<textarea
						className='border-2 border-black p-3'
						{...register('remarks', {
							validate: {
								pattern: (value) => !/[!]/.test(value)
							}
						})}
					/>
				</div>
				<div className='flex justify-center pt-6'>
					<InputSubmitComponent text='CREAR SERVICIO' />
				</div>
			</form>
		</div>
	)
}
