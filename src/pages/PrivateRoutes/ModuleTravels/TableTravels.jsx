import React from 'react'

import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { notificationStore } from '../../../store/notificationStore'
import { InputSearch } from '../components'
import { BoardDevice } from '../ModuleDevices/BoardDevice'

export const TableTravels = () => {
	const { register, handleSubmit } = useForm()
	const arrayTableTravels = notificationStore((state) => state.arrayTableTravels)

	return (
		<>
			<div className='flex justify-between pt-5 py-20'>
				<Link
					to='/user/travels-screen/create-travel'
					className='p-2 bg-black text-white rounded-lg flex justify-center items-center'
				>
					Crear Viaje
				</Link>
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
			<BoardDevice dataBody={arrayTableTravels?.results} to='travels-screen/travel' />
			{/* <div className='py-5 flex justify-center items-center'>
				<PaginationComponent
					pageSelected={pageSelected}
					dataPagination={arrayTableInventory?.info}
					setPageSelected={setPageSelected}
					setArray={setArray}
					array={array}
				/>
			</div> */}
		</>
	)
}
