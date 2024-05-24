import React, { useState } from 'react'

import { useForm } from 'react-hook-form'

import { LoaderComponent } from '../../../Components'
import { InputSearch } from '../components'
import { BoardDevice } from '../ModuleDevices/BoardDevice'
import { useService } from './hooks/useService'

export const Table = () => {
	const [page, setPage] = useState(1)
	const { fetchDataService } = useService()
	const { register, handleSubmit } = useForm()
	const [dataSearch, setDataSearch] = useState('')
	const [array, setArray] = useState([1, 2, 3, 4, 5])

	const dataTableServices = fetchDataService(page, '')

	dataTableServices.isLoading && <LoaderComponent />

	return (
		<>
			<div className='flex justify-between pt-5 py-20'>
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
			<BoardDevice dataBody={dataTableServices?.data?.data?.results} />
		</>
	)
}
