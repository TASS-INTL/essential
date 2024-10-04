export const calculateCircle = (lat, lng) => {
	let center = [lng, lat]
	let radius = 5
	let options = { steps: 100, units: 'kilometers', properties: { foo: 'bar' } }
	let circle = turf.circle(center, radius, options)
	return circle
}

export function trimText(texto, maxLongitud) {
	if (texto.length > maxLongitud) {
		return texto.substring(0, maxLongitud) + '...'
	} else {
		return texto
	}
}
