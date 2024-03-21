import React, { useState } from 'react'

import { useForm } from 'react-hook-form'

import { BoardComponent, InputSubmitComponent, LoaderComponent, PaginationComponent } from '../../Components'
import { tableTitleInventory } from './constants'
import { useInventory } from './Hooks/useInventory'

export const InventoryScreen = () => {
	const { register, handleSubmit } = useForm()
	const [array, setArray] = useState([1, 2, 3, 4, 5])

	console.log(array)

	const { fetchDataInventory } = useInventory()
	const [pageSelected, setPageSelected] = useState(1)
	const [dataSearch, setDataSearch] = useState('')

	const dataInventory = fetchDataInventory(pageSelected, dataSearch)

	if (dataInventory.isLoading) return <LoaderComponent />

	return (
		<div className='w-full'>
			<div className='w-full max-w-6xl mx-auto'>
				<div className='flex justify-between px-0 py-10 pt-10'>
					<h4 className='text-pretty text-4xl font-medium'>Inventario</h4>
					<div className='relative'>
						<form
							onSubmit={handleSubmit((data) => {
								setDataSearch(data.search)
							})}
						>
							<div className=' relative'>
								<div className='absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none'>
									<svg
										className='w-5 h-5 text-gray-500 '
										aria-hidden='true'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											fillRule='evenodd'
											d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
											clipRule='evenodd'
										></path>
									</svg>
								</div>
								<input
									{...register('search')}
									type='text'
									id='table-search'
									className='block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 '
									placeholder='Search for items'
								/>
							</div>
						</form>
					</div>
				</div>
				<BoardComponent
					dataHeader={tableTitleInventory}
					dataBody={dataInventory?.data?.data?.results}
					functionOnClick={() => {}}
				/>

				<div className='py-5 flex justify-center items-center'>
					<PaginationComponent
						pageSelected={pageSelected}
						dataPagination={dataInventory?.data?.data?.info}
						setPageSelected={setPageSelected}
						setArray={setArray}
						array={array}
					/>
				</div>
			</div>
		</div>
	)
}
