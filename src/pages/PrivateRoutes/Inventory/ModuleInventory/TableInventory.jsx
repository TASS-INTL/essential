import React, { useState } from 'react'

import { BoardComponent, PaginationComponent } from '@/Components'
import { InputSearch } from '@/Components/InputSearch'
import { inventoryStore } from '@/store/inventoryStore'
import { useForm } from 'react-hook-form'

import { tableTitleInventory } from '../../constants/constants'

export const TableInventory = () => {
	const { register, handleSubmit } = useForm()
	const [pageSelected, setPageSelected] = useState(1)
	const [array, setArray] = useState([1, 2, 3, 4, 5])
	const arrayTableInventory = inventoryStore((state) => state.arrayTableInventory)

	const HandleChange = (data) => {}

	return (
		<div>
			<div className='flex justify-between px-0 py-10 pt-10'>
				<div className='relative'>
					<form onSubmit={handleSubmit(HandleChange)}>
						<InputSearch register={register} />
					</form>
				</div>
			</div>
			<BoardComponent
				dataHeader={tableTitleInventory}
				dataBody={arrayTableInventory?.results}
				functionOnClick={() => {}}
			/>
			<div className='py-5 flex justify-center items-center'>
				<PaginationComponent
					pageSelected={pageSelected}
					dataPagination={arrayTableInventory?.info}
					setPageSelected={setPageSelected}
					setArray={setArray}
					array={array}
				/>
			</div>
		</div>
	)
}
