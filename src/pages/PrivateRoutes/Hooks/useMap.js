import { useEffect, useState } from 'react'

import { MapLibreSearchControl } from '@stadiamaps/maplibre-search-box'

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

	const createMarkerMap = (lng, lat, map, flagDraggable = true) => {
		// Agregar un nuevo marcador en la ubicación del clic
		const newMarker = new maplibregl.Marker({ draggable: flagDraggable }).setLngLat([lng, lat]).addTo(map)
		return newMarker
	}

	//
	const addMarkersMap = (arrayLatAndLng, map) => {}

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
			const nameField = countValueFill === 1 ? 'place_start' : countValueFill === 2 ? 'place_end' : 'station'
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

	return {
		setMapGlobal,
		createMarkerMap,
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
