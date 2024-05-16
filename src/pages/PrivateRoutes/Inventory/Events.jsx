import React from 'react'

import { useLocation, useParams } from 'react-router-dom'

import { inventoryStore } from '../../../store/inventoryStore'
import { TapBottons } from '../components'
import { BoardDevice } from '../Devices/BoardDevice'

export const Events = () => {
	const { idDevice } = useParams()
	const location = useLocation()
	const arrayTableInventoryEvents = inventoryStore((state) => state.arrayTableInventoryEvents)

	return (
		<div>
			<TapBottons location={location} idDevice={idDevice} />
			<div className='pt-10'>
				<h1 className=' text-2xl pb-5'>Tabla de eventos</h1>
				<BoardDevice dataBody={arrayTableInventoryEvents?.data?.results} />
			</div>
		</div>
	)
}
