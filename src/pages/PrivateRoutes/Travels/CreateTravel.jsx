import React, { useEffect, useState } from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MapLibreSearchControl } from '@stadiamaps/maplibre-search-box'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'

import { InputSubmitComponent, SelectComponent } from '../../../Components'
import { Map } from '../components/Map'
import { useMap } from '../Hooks/useMap'
import { useTravels } from './hooks/useTravels'

const objKeys = [{ name: 'place_start' }, { name: 'place_end' }]

export const CreateTravel = () => {
	const [markers, setMarkers] = useState([])
	const { fetchDataInfoRegister, handleCreateTravel } = useTravels()
	const dataInfoRegister = fetchDataInfoRegister()
	const { register, handleSubmit, watch } = useForm()
	const [dateEnd, setDateEnd] = useState(dayjs('2024-04-17T15:30'))
	const [dateStart, setDateStart] = useState(dayjs('2024-04-17T15:30'))
	const { createMarkerMap, setMapGlobal, mapGlobal, deleteMarkerMap, createCircleRadio } = useMap()
	//viaje
	const [dataCoordinates, setDataCoordinates] = useState({ location_start: {}, location_end: {}, station: [] })
	const [countValueFill, setCountValueFill] = useState(0)
	const [idLayerDelete, setIdLayerDelete] = useState(null)
	const [idsLayers, setIdsLayers] = useState({ marker: [] })
	const [valueFromAdress, setValueFromAdress] = useState(null)
	const [dataGlobal, setDataGlobal] = useState(null)

	const control = new MapLibreSearchControl({
		useMapFocusPoint: true,
		mapFocusPointMinZoom: 5,
		onResultSelected: (res) => {
			setValueFromAdress(res)
		}
	})

	useEffect(() => {
		if (watch()?.service?.did) {
			const filter = dataInfoRegister?.data?.data?.services.filter((word) => word._id === watch().service.did)
			if (filter.length > 0) {
				if (markers?.length > 0) {
					deleteMarkerMap(markers[0])
					deleteMarkerMap(markers[1])
					setMarkers([])
				}
				objKeys.map((item, i) => {
					const marker = createMarkerMap(
						filter[0]?.[item.name]?.location?.coordinates[0],
						filter[0]?.[item.name]?.location?.coordinates[1],
						mapGlobal,
						false
					)
					setMarkers((state) => [...state, marker])
				})
			}
		}
	}, [watch()?.service?.did])

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
			newMarker.on('dragend', (evento) => {
				f
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
		if (countValueFill > 0) {
			const { data } = dataGlobal
			const geo = {
				type: data.circle.geometry.type,
				coordinates: data.circle.geometry.coordinates,
				properties: { radio: 0.5 }
			}
			const location = {
				type: 'Point',
				coordinates: [data.values.lng, data.values.lat]
			}
			const nameField =
				countValueFill === 1 ? 'location_start' : countValueFill === 2 ? 'location_end' : 'station'
			// setCoordinatesById((state) => ({ ...state, [nameField]: latAndLongId }))

			if (nameField === 'station') {
				setDataCoordinates((state) => ({
					...state,
					[nameField]: [
						...state.station,
						{
							geo,
							location,
							region: 'region',
							common_name: 'common_name',
							country: 'country',
							county: 'county'
						}
					]
				}))
			} else {
				setDataCoordinates((state) => ({
					...state,
					[nameField]: {
						location,
						geo,
						region: 'region',
						common_name: 'common_name',
						country: 'country',
						county: 'county'
					}
				}))
			}
		}
	}, [countValueFill, dataGlobal])

	return (
		<div>
			<form
				action=''
				onSubmit={handleSubmit((data) => {
					const device = dataInfoRegister?.data?.data?.devices.filter(
						(devices) => devices._id === data.device.id_device
					)
					const installer = dataInfoRegister?.data?.data?.installers.filter(
						(installers) => installers._id === data.installer.id_installer
					)
					const service = dataInfoRegister?.data?.data?.services.filter(
						(services) => services._id === data.service.did
					)
					const dataSend = {
						date_end: format(dateEnd.$d, 'yyyy-MM-dd hh:mm:ss'),
						date_start: format(dateStart.$d, 'yyyy-MM-dd hh:mm:ss'),
						devices: [
							{
								did: device[0].did,
								id_device: device[0]._id,
								status: device[0].status,
								type_operation: 'INSTALLATION'
							}
						],
						installers: [
							{
								id_installer: installer[0]._id,
								name: installer[0].name,
								status: installer[0].status,
								type_operation: 'INSTALLATION'
							}
						],
						location_end: dataCoordinates.location_end,
						location_start: dataCoordinates.location_start,
						service: {
							did: service[0].did,
							id_service: service[0]._id
						}
					}
					handleCreateTravel(dataSend)
				})}
			>
				<h1 className='font-normal py-4 flex justify-center '>Creacion de viaje</h1>
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
				<SelectComponent
					color
					register={register}
					label='Selecciona el servicio'
					name='service.did'
					arrayOptions={dataInfoRegister?.data?.data?.services}
					option='did'
				/>
				<div className='flex justify-evenly'>
					<h4 className='py-4'>Lugar de inicio {countValueFill > 0 ? '✅️' : '❌'}</h4>
					<h4 className='py-4'>Lugar de fin {countValueFill > 1 ? '✅️' : '❌'}</h4>
				</div>
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
				<div className='flex justify-center pt-6'>
					<InputSubmitComponent text='CREAR VIAJE' />
				</div>
			</form>
		</div>
	)
}
