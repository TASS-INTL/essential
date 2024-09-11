import circle from '@turf/circle'

export const calculateCircle = (lat, lng) => {
	let center = [lat, lng]
	let radius = 5
	let options = { steps: 10, units: 'kilometers', properties: { foo: 'bar' } }
	let circle = turf.circle(center, radius, options)
	return circle
}
