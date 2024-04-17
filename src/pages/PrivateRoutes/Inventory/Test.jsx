import React from 'react'

import { useLocation, useParams } from 'react-router-dom'

import { TapBottons } from '../components'

export const Test = () => {
	const location = useLocation()
	const { idDevice } = useParams()

	return (
		<div>
			<TapBottons location={location} idDevice={idDevice} />

			<h1>Test</h1>
			<div className=''>aqui se va mostrar la tabla de test</div>
		</div>
	)
}
