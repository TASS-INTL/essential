import React, { useState } from 'react'

import { travelsStore } from '@/store/travelsStore'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'

import { CreateTravel } from '.'
import { LoaderComponent, ModalComponent } from '../../../../Components'
import { InputSearch } from '../../../../Components/InputSearch'
import { initialStateTravel } from '../../constants/constants'

export const TableTravels = () => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(!open)
	const { register, handleSubmit } = useForm()
	const arrayTableTravels = travelsStore((state) => state.arrayTableTravels)

	const handlePagination = (data) => {
		setPageSelected(1)
		setArray([1, 2, 3, 4, 5])
		setDataSearch(data.search)
	}

	if (arrayTableTravels === null) return <LoaderComponent />

	return (
		<>
			<div className='flex justify-between pt-5 py-10'>
				<Button variant='contained' onClick={handleOpen}>
					Crear Viaje
				</Button>
				<form onSubmit={handleSubmit(handlePagination)}>
					<InputSearch register={register} />
				</form>
			</div>
			<div>
				{arrayTableTravels?.results?.map((item) => (
					<div key={item._id} className='p-4 bg-white rounded-xl'>
						<div className='flex justify-between'>
							<div className=''>
								<div className='flex flex-col'>
									<span className='text-black font-bold text-xs'>{item?.did}</span>
									<span className='text-black font-bold text-xs'>
										Fecha: <span className='font-light'>{item?.created_at}</span>
									</span>
								</div>
							</div>
							<div className='flex gap-5'>
								<div className='bg-yellow-300 rounded-full flex justify-center items-center '>
									<span className='text-[0.7rem] px-5'>{item.status}</span>
								</div>
								<NavLink
									className='bg-black rounded-lg flex items-center'
									to={`/user/travels-screen/travel/${item?._id}/general`}
								>
									<span className='text-[0.7rem] text-white px-5 '>Ver Viaje</span>
								</NavLink>
							</div>
						</div>
						<div className='flex mt-3'>
							<div className='h-3 w-full border border-blue-600 rounded-full '>
								<div className={`pl-3 w-[${item?.distance?.progress}%] h-3 bg-blue-600 rounded-full`} />
							</div>
						</div>
						<div className='flex gap-4'>
							<div className='p-1'>
								<span className=' font-medium text-sm'>
									_id: <span className='font-light text-xs'> {item?._id}</span>
								</span>
							</div>
							<div className='p-1'>
								<span className=' font-medium text-sm'>
									servicio: <span className='font-light text-xs'> {item?.service}</span>
								</span>
							</div>
							<div className='p-1'>
								<span className=' font-medium text-sm'>
									eventos : <span className='font-light text-xs'> {item?.events}</span>
								</span>
							</div>
							<div className='p-1'>
								<span className=' font-medium text-sm'>
									monitoreo: <span className='font-light text-xs'> {item?.monitoring}</span>
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
			<ModalComponent handleOpen={open} HandleClose={handleOpen} titleModal='Creacion del Viaje'>
				<CreateTravel dataForm={initialStateTravel} />
			</ModalComponent>
		</>
	)
}
