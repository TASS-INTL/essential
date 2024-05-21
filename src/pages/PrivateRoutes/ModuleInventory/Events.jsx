import React from 'react'

import { useLocation, useParams } from 'react-router-dom'

import { inventoryStore } from '../../../store/inventoryStore'
import { TapBottons } from '../components'
import { BoardDevice } from '../ModuleDevices/BoardDevice'

export const Events = () => {
	const { idDevice } = useParams()
	const location = useLocation()
	const arrayTableInventoryEvents = inventoryStore((state) => state.arrayTableInventoryEvents)

	console.log()

	return (
		<div>
			<TapBottons location={location} idDevice={idDevice} path='devices-screen/device' />
			<div className='pt-10'>
				<h1 className=' text-2xl pb-5'>Tabla de eventos</h1>
				<BoardDevice dataBody={arrayTableInventoryEvents?.data?.results} />
			</div>
		</div>
	)
}
