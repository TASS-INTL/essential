import React from 'react'

import { Link, useLocation, useParams } from 'react-router-dom'

import { inventoryStore } from '../../../store/inventoryStore'
import { TapBottons } from '../components'
import { useInventory } from './Hooks/useInventory'
import { useInventorySocket } from './Hooks/useInventorySockets'

export const General = () => {
	const location = useLocation()
	const { idDevice } = useParams()

	const { handleSendComand } = useInventory({ idDevice })

	const { emmitToDevice } = useInventorySocket({ idDevice })
	const deviceInfo = inventoryStore((state) => state.deviceInfo)

	const handleSendCommand = (typeComand) => {
		handleSendComand({ idDevice, typeComand, did: deviceInfo?.general?.did })
	}

	return (
		<div>
			<TapBottons location={location} idDevice={idDevice} />
			<section>
				<h3 className='pt-10'>GENERAL</h3>
				<div className='flex flex-col'>
					<span className=' text-pretty'>
						Did: <span> {deviceInfo?.general?.did}</span>
					</span>
					<span className=' text-pretty'>
						Lock: <span> {deviceInfo?.general?.lock?.value}</span>
					</span>
					<span className=' text-pretty'>
						Name: <span> {deviceInfo?.general?.did}</span>
					</span>
				</div>
				<div className='flex flex-row gap-6'>
					<button
						onClick={() => handleSendCommand('open')}
						className='bg-lime-700 py-2 px-5 text-white rounded-lg'
					>
						Abrir
					</button>
					<button
						onClick={() => handleSendCommand('close')}
						className='bg-red-700 py-2 px-5 text-white rounded-lg'
					>
						Cerrar
					</button>
				</div>
			</section>

			<section>
				<h3 className='pt-10'>CONTROL</h3>
			</section>

			<section>
				<h3 className='pt-10'>COMUNICATION</h3>
			</section>

			<section>
				<h3 className='pt-10'>IOT CORE</h3>
			</section>

			<div className=''>aqui se va mostrar toda la info de general</div>
		</div>
	)
}
