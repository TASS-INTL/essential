import React from 'react'

import { ErrorComponent, LoaderComponent, TitleWithLive } from '@/Components'
import { BoardDevice } from '@/Components/BoardDevice'
import { Container } from '@/Components/Container'
import { arrayTapInventory, TapBottons } from '@/Components/TapBottons'
import { inventoryStore } from '@/store/inventoryStore'
import { useLocation, useParams } from 'react-router-dom'

export const Events = () => {
	const { idDevice } = useParams()
	const location = useLocation()
	const arrayTableInventoryEvents = inventoryStore((state) => state.arrayTableInventoryEvents)

	if (arrayTableInventoryEvents === null) return <LoaderComponent />

	if (arrayTableInventoryEvents.error) return <ErrorComponent error={arrayTableInventoryEvents.message} />

	return (
		<div className='px-10'>
			<TapBottons location={location} idDevice={idDevice} path='devices-screen/device' data={arrayTapInventory} />
			<TitleWithLive title='EVENTOS' inLive />
			<BoardDevice dataBody={arrayTableInventoryEvents?.data?.results} />
		</div>
	)
}
