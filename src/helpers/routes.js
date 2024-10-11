export const calculateCircle = (lat, lng) => {
	const center = [lng, lat]
	const radius = 5
	const options = { steps: 100, units: 'kilometers', properties: { foo: 'bar' } }
	const circle = turf.circle(center, radius, options)
	return circle
}

export function trimText(texto, maxLongitud) {
	if (texto.length > maxLongitud) {
		return texto.substring(0, maxLongitud) + '...'
	} else {
		return texto
	}
}
