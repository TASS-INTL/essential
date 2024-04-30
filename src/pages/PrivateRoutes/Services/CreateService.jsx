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
	const [mapGlobal, setMapGlobal] = useState(null)
	const [dataGlobal, setDataGlobal] = useState(null)
	const [countValueFill, setCountValueFill] = useState(0)
	const [valueFromAdress, setValueFromAdress] = useState(null)
	const [dateEnd, setDateEnd] = useState(dayjs('2024-04-17T15:30'))
	const [dateStart, setDateStart] = useState(dayjs('2024-04-17T15:30'))
	const [dataCoordinates, setDataCoordinates] = useState({ place_start: {}, place_end: {}, station: [] })
	const [idsLayers, setIdsLayers] = useState({ marker: [] })

	const [latAndLongId, setlatAndLongId] = useState(null)

	const [coordinatesById, setCoordinatesById] = useState({ place_start: '', place_end: '', station: '' })

	const [idLayerDelete, setIdLayerDelete] = useState(null)

	const control = new MapLibreSearchControl({
		useMapFocusPoint: true,
		mapFocusPointMinZoom: 5,
		onResultSelected: (res) => {
			setValueFromAdress(res)
		}
	})

	useEffect(() => {
		mapGlobal?.addControl(control, 'top-left')
	}, [mapGlobal])

	useEffect(() => {
		if (idsLayers[idLayerDelete]?.length > 1) {
			mapGlobal.removeLayer(idsLayers[idLayerDelete][0])
			idsLayers[idLayerDelete].shift()
		}
	}, [idsLayers, idLayerDelete, mapGlobal])

	useEffect(() => {
		mapGlobal?.on('click', (e) => {
			const { circle, idLayer } = createCircleRadio(e.lngLat.lng, e.lngLat.lat, mapGlobal)
			const newMarker = createMarkerMap(e.lngLat.lng, e.lngLat.lat, mapGlobal)
			setCountValueFill((state) => state + 1)
			setDataGlobal({ data: { circle, values: e.lngLat }, id: e.lngLat.lng })
			setIdsLayers((state) => ({ ...state, [`marker-${e.lngLat.lng}`]: [...state.marker, idLayer] }))
			setlatAndLongId(e.lngLat.lng)
			newMarker.on('dragend', () => {
				const lngLat = newMarker.getLngLat()
				const { circle, idLayer: idNewLayer } = createCircleRadio(lngLat.lng, lngLat.lat, mapGlobal)
				setIdsLayers((state) => ({
					...state,
					[`marker-${e.lngLat.lng}`]: [...state[`marker-${e.lngLat.lng}`], idNewLayer]
				}))
				setIdLayerDelete(`marker-${e.lngLat.lng}`)
				setDataGlobal({ data: { circle, values: lngLat }, id: e.lngLat.lng })
			})
		})
	}, [mapGlobal])

	useEffect(() => {
		if (valueFromAdress) {
			const value = valueFromAdress.geometry.coordinates
			const { circle, idLayer } = createCircleRadio(value[0], value[1], mapGlobal)
			const newMarker = createMarkerMap(value[0], value[1], mapGlobal)
			setCountValueFill((state) => state + 1)
			setDataGlobal({ data: { circle, values: valueFromAdress } })
			setIdsLayers((state) => ({ ...state, [`marker-${value[0]}`]: [...state.marker, idLayer] }))

			newMarker.on('dragend', () => {
				const lngLat = newMarker.getLngLat()
				const { circle, idLayer: idNewLayer } = createCircleRadio(lngLat.lng, lngLat.lat, mapGlobal)
				setIdsLayers((state) => ({
					...state,
					[`marker-${value[0]}`]: [...state[`marker-${value[0]}`], idNewLayer]
				}))
				setIdLayerDelete(`marker-${value[0]}`)
				setDataGlobal({ data: { circle, values: lngLat } })
			})
		}
	}, [valueFromAdress])

	useEffect(() => {
		console.log(dataGlobal)

		if (countValueFill > 0) {
			const nameField = countValueFill === 1 ? 'place_start' : countValueFill === 2 ? 'place_end' : 'station'
			// setCoordinatesById((state) => ({ ...state, [nameField]: latAndLongId }))

			if (nameField === 'station') {
				setDataCoordinates((state) => ({ ...state, [nameField]: [...state.station, dataGlobal] }))
			} else {
				setDataCoordinates((state) => ({ ...state, [nameField]: dataGlobal }))
			}
		}
	}, [countValueFill, dataGlobal])

	console.log(dataCoordinates.place_start.constructor === Object)

	return (
		<div className='pt-10 overflow-scroll h-5/6 px-10'>
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
				<div className='flex justify-between'>
					<h4 className='py-4'>Lugar de inicio {dataCoordinates.place_start.length !== 0 ? '✅️' : '❌'}</h4>
					<h4 className='py-4'>Lugar de fin {dataCoordinates.place_end ? '✅️' : '❌'}</h4>
					<h4 className='py-4'>paradas {dataCoordinates.station.length !== 0 ? '✅️' : '❌'}</h4>
				</div>
				<Map setMapGlobal={setMapGlobal} />
			</div>
			<form
				onSubmit={handleSubmit((data) => {
					console.log(format(dateStart.$d, 'yyyy-MM-dd hh:mm:ss'))
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
					label='Numero de documento'
					placeholder='000 000 0000'
				/>
				<InputComponent
					color
					required
					name='driver.phone'
					type='number'
					svg={emailSvg}
					register={register}
					label='Numero de celular'
					placeholder='000 000 0000'
				/>
				<div className='flex flex-col'>
					<label htmlFor='story' className='py-1'>
						Quieres dar alguna indicacion adicional ?
					</label>
					<textarea
						className='border border-black p-3 rounded-lg'
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
