import React from 'react'

import { useLocation, useParams } from 'react-router-dom'

import { inventoryStore } from '../../../store/inventoryStore'
import { TapBottons } from '../components'
import { arrayTapInventory } from '../components/TapBottons'
import { BoardDevice } from '../ModuleDevices/BoardDevice'

export const Events = () => {
	const { idDevice } = useParams()
	const location = useLocation()
	const arrayTableInventoryEvents = inventoryStore((state) => state.arrayTableInventoryEvents)

	return (
		<div>
			<TapBottons location={location} idDevice={idDevice} path='devices-screen/device' data={arrayTapInventory} />
			<div className='pt-10'>
				<h1 className=' text-2xl pb-5'>Tabla de eventos</h1>
				<BoardDevice dataBody={arrayTableInventoryEvents?.data?.results} />
			</div>
		</div>
	)
}
