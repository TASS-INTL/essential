import React from 'react'

import { BoardComponent } from '../../../../../Components'
import { InputSearch } from '../../../components'
import { tableTitleInventory } from '../../../constants/constants'

export const TableDevices = () => {
	const arrayTableInventory = inventoryStore((state) => state.arrayTableInventory)
	const [dataSearch, setDataSearch] = useState('')
	const [pageSelected, setPageSelected] = useState(1)
	const [array, setArray] = useState([1, 2, 3, 4, 5])

	const handleChangeInputSearch = (data) => {
		setPageSelected(1)
		setArray([1, 2, 3, 4, 5])
		setDataSearch(data.search)
	}

	return (
		<div>
			<div className='flex justify-between px-0 py-10 pt-10'>
				<div className='relative'>
					<form onSubmit={handleSubmit(handleChangeInputSearch)}>
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
