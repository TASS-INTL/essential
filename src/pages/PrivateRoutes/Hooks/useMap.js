import { emailSvg } from '../../../assets/assetsplatform'

export const useMap = () => {
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

		// Add a line layer to draw the circle outline
		// map.addLayer({
		// 	id: `location-radius-outline-${lng}`,
		// 	type: 'line',
		// 	source: {
		// 		type: 'geojson',
		// 		data: circle
		// 	},
		// 	paint: {
		// 		'line-color': '#0094ff',
		// 		'line-width': 3
		// 	}
		// })

		return { circle, layer, idLayer: `location-radius-${lng}` }
	}

	const createMarkerMap = (lng, lat, map) => {
		// Agregar un nuevo marcador en la ubicación del clic
		const newMarker = new maplibregl.Marker({ draggable: true }).setLngLat([lng, lat]).addTo(map)
		return newMarker
	}

	return { createCircleRadio, createMarkerMap }
}
