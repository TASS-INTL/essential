import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { BoardComponent } from '../../../Components'
import { deviceStore } from '../../../store/deviceStore'
import { InputSearch } from '../components'
import { tableTitleInventory } from '../constants/constants'
import { BoardDevice } from './BoardDevice'

export const TableDevice = () => {
	const { register, handleSubmit } = useForm()
	const [dataSearch, setDataSearch] = useState('')
	// const { paginationEmit } = useInventorySocket()
	const [pageSelected, setPageSelected] = useState(1)
	const [array, setArray] = useState([1, 2, 3, 4, 5])
	const arrayTabledevice = deviceStore((state) => state.arrayTabledevice)

	return (
		<>
			<div className='flex justify-between px-0 py-10 pt-10'>
				<Link
					to='/user/devices-screen/assign-device'
					className='p-2 bg-black text-white rounded-lg flex justify-center items-center'
				>
					Asignar dispositivo
				</Link>
				<div className='relative'>
					<form
						onSubmit={handleSubmit((data) => {
							setPageSelected(1)
							setArray([1, 2, 3, 4, 5])
							setDataSearch(data.search)
						})}
					>
						<InputSearch register={register} />
					</form>
				</div>
			</div>
			<div className='py-2'>ACTUALIZACION EN TIEMPO REAL</div>
			<BoardDevice dataBody={arrayTabledevice?.results} to='devices-screen/device' />
		</>
	)
}
