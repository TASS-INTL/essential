import React, { useState } from 'react'

import { useForm } from 'react-hook-form'

import { LoaderComponent } from '../../../../Components'
import { InputSearch } from '../../components'
import { BoardDevice } from '../../Inventory/ModuleDevices/BoardDevice'
import { useService } from './hooks/useService'

export const Table = () => {
	const [page, setPage] = useState(1)
	const { fetchDataService } = useService()
	const { register, handleSubmit } = useForm()
	const [dataSearch, setDataSearch] = useState('')
	const [array, setArray] = useState([1, 2, 3, 4, 5])

	const dataTableServices = fetchDataService(page, '')

	dataTableServices.isLoading && <LoaderComponent />

	const handleSubmitPagination = (data) => {
		setPageSelected(1)
		setArray([1, 2, 3, 4, 5])
		setDataSearch(data.search)
	}

	return (
		<div className=''>
			<div className='flex justify-end py-2'>
				<form onSubmit={handleSubmit(handleSubmitPagination)}>
					<InputSearch register={register} />
				</form>
			</div>
			<BoardDevice dataBody={dataTableServices?.data?.data?.results} />
		</div>
	)
}
