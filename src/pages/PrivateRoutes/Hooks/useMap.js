import { useEffect, useState } from 'react'

import { MapLibreSearchControl } from '@stadiamaps/maplibre-search-box'

import { padlockOpen } from '../../../assets/assetsplatform'
import CustomMarkerIcon from '../../../assets/assetsplatform/PadLock'

export const useMap = () => {
	const [mapGlobal, setMapGlobal] = useState(null)
	const [dataGlobal, setDataGlobal] = useState(null)
	const [countValueFill, setCountValueFill] = useState(0)
	const [idLayerDelete, setIdLayerDelete] = useState(null)
	const [idsLayers, setIdsLayers] = useState({ marker: [] })
	const [valueFromAdress, setValueFromAdress] = useState(null)
	const [dataCoordinates, setDataCoordinates] = useState({ place_start: {}, place_end: {}, station: [] })

	const control = new MapLibreSearchControl({
		useMapFocusPoint: true,
		mapFocusPointMinZoom: 5,
		onResultSelected: (res) => {
			setValueFromAdress(res)
		}
	})

	const createCircleRadio = (lng, lat, map) => {
		const radius = 0.5 // kilometer
		const options = {
			steps: 64,
			units: 'kilometers'
		}

		const circle = turf.circle([lng, lat], radius, options)

		// Add a fill layer with some transparency.
		const layer = map.addLayer({
			id: `location-radius-${lng}`,
			type: 'fill',
			source: {
				type: 'geojson',
				data: circle
			},
			paint: {
				'fill-color': '#8CCFFF',
				'fill-opacity': 0.3
			}
		})

		return { circle, layer, idLayer: `location-radius-${lng}` }
	}

	const createMarkerMap = (lng, lat, map, flagDraggable = true, element = false) => {
		// Agregar un nuevo marcador en la ubicación del clic
		const newMarker = new maplibregl.Marker({
			draggable: flagDraggable,
			element: element ? createCustomMarker() : null
		})
			.setLngLat([lng, lat])
			.addTo(map)
		newMarker.addClassName(`marker${lng}hoaldesdeelmarkercamilo`)
		return newMarker
	}

	const createCustomMarker = () => {
		const el = document.createElement('div')
		const svgIcon = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' width='40px' height='40px'>
		<path d='M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.300781 20 6 21.300781 6 23 L 6 47 C 6 48.699219 7.300781 50 9 50 L 41 50 C 42.699219 50 44 48.699219 44 47 L 44 23 C 44 21.300781 42.699219 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 25 30 C 26.699219 30 28 31.300781 28 33 C 28 33.898438 27.601563 34.6875 27 35.1875 L 27 38 C 27 39.101563 26.101563 40 25 40 C 23.898438 40 23 39.101563 23 38 L 23 35.1875 C 22.398438 34.6875 22 33.898438 22 33 C 22 31.300781 23.300781 30 25 30 Z' />
	</svg>`
		el.innerHTML = svgIcon // Inserta el icono SVG como HTML
		return el
	}

	const deleteMarkerMap = (marker) => {
		marker.remove()
	}

	// useEffect(() => {
	// 	mapGlobal?.addControl(control, 'top-left')
	// }, [mapGlobal])

	// useEffect(() => {
	// 	if (idsLayers[idLayerDelete]?.length > 1) {
	// 		mapGlobal.removeLayer(idsLayers[idLayerDelete][0])
	// 		idsLayers[idLayerDelete].shift()
	// 	}
	// }, [idsLayers, idLayerDelete, mapGlobal])

	// useEffect(() => {
	// 	mapGlobal?.on('click', (e) => {
	// 		const { circle, idLayer } = createCircleRadio(e.lngLat.lng, e.lngLat.lat, mapGlobal)
	// 		const newMarker = createMarkerMap(e.lngLat.lng, e.lngLat.lat, mapGlobal)
	// 		setCountValueFill((state) => state + 1)
	// 		setDataGlobal({ data: { circle, values: e.lngLat }, id: e.lngLat.lng })
	// 		setIdsLayers((state) => ({ ...state, [`marker-${e.lngLat.lng}`]: [...state.marker, idLayer] }))
	// 		newMarker.on('dragend', () => {
	// 			const lngLat = newMarker.getLngLat()
	// 			const { circle, idLayer: idNewLayer } = createCircleRadio(lngLat.lng, lngLat.lat, mapGlobal)
	// 			setIdsLayers((state) => ({
	// 				...state,
	// 				[`marker-${e.lngLat.lng}`]: [...state[`marker-${e.lngLat.lng}`], idNewLayer]
	// 			}))
	// 			setIdLayerDelete(`marker-${e.lngLat.lng}`)
	// 			setDataGlobal({ data: { circle, values: lngLat }, id: e.lngLat.lng })
	// 		})
	// 	})
	// }, [mapGlobal])

	// useEffect(() => {
	// 	if (valueFromAdress) {
	// 		const value = valueFromAdress.geometry.coordinates
	// 		const { circle, idLayer } = createCircleRadio(value[0], value[1], mapGlobal)
	// 		const newMarker = createMarkerMap(value[0], value[1], mapGlobal)
	// 		setCountValueFill((state) => state + 1)
	// 		setDataGlobal({ data: { circle, values: valueFromAdress } })
	// 		setIdsLayers((state) => ({ ...state, [`marker-${value[0]}`]: [...state.marker, idLayer] }))
	// 		newMarker.on('dragend', () => {
	// 			const lngLat = newMarker.getLngLat()
	// 			const { circle, idLayer: idNewLayer } = createCircleRadio(lngLat.lng, lngLat.lat, mapGlobal)
	// 			setIdsLayers((state) => ({
	// 				...state,
	// 				[`marker-${value[0]}`]: [...state[`marker-${value[0]}`], idNewLayer]
	// 			}))
	// 			setIdLayerDelete(`marker-${value[0]}`)
	// 			setDataGlobal({ data: { circle, values: lngLat } })
	// 		})
	// 	}
	// }, [valueFromAdress])

	// useEffect(() => {
	// 	if (countValueFill > 0) {
	// 		const { data } = dataGlobal
	// 		const geo = {
	// 			type: data.circle.geometry.type,
	// 			coordinates: data.circle.geometry.coordinates,
	// 			properties: { radio: 0.5 }
	// 		}
	// 		const location = {
	// 			type: 'Point',
	// 			coordinates: [data.values.lng, data.values.lat]
	// 		}
	// 		const nameField = countValueFill === 1 ? 'place_start' : countValueFill === 2 ? 'place_end' : 'station'
	// 		if (nameField === 'station') {
	// 			setDataCoordinates((state) => ({
	// 				...state,
	// 				[nameField]: [
	// 					...state.station,
	// 					{
	// 						geo,
	// 						location,
	// 						region: 'region',
	// 						common_name: 'common_name',
	// 						country: 'country',
	// 						county: 'county'
	// 					}
	// 				]
	// 			}))
	// 		} else {
	// 			setDataCoordinates((state) => ({
	// 				...state,
	// 				[nameField]: {
	// 					location,
	// 					geo,
	// 					region: 'region',
	// 					common_name: 'common_name',
	// 					country: 'country',
	// 					county: 'county'
	// 				}
	// 			}))
	// 		}
	// 	}
	// }, [countValueFill, dataGlobal])

	return {
		setMapGlobal,
		createMarkerMap,
		deleteMarkerMap,
		createCircleRadio,
		control,
		idsLayers,
		mapGlobal,
		dataGlobal,
		idLayerDelete,
		countValueFill,
		valueFromAdress,
		dataCoordinates
	}
}
