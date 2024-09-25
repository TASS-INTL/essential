import circle from '@turf/circle'

export const calculateCircle = (lat, lng) => {
	let center = [lng, lat]
	let radius = 5
	let options = { steps: 100, units: 'kilometers', properties: { foo: 'bar' } }
	let circle = turf.circle(center, radius, options)
	return circle
}
