import React, { useContext } from 'react'

import { useInventorySocket } from '../Hooks/inventory/useInventorySockets'

export const General = () => {
	const { emmitToDevice } = useInventorySocket()

	return (
		<div>
			<h1 className='pt-10'>GENERAL</h1>
			<div className=''>aqui se va mostrar toda la info de general</div>
		</div>
	)
}
