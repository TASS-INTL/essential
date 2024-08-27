import React, { useState } from 'react'

import { useForm } from 'react-hook-form'

import { BoardComponent, PaginationComponent } from '../../../../Components'
import { InputSearch } from '../../../../Components/InputSearch'
import { notificationStore } from '../../../../store/notificationStore'
import { tableTitle } from '../../constants/constants'

export const TableNotification = () => {
	const arrayNotification = notificationStore((state) => state.arrayNotification)
	const [pageSelected, setPageSelected] = useState(1)
	const { register, handleSubmit } = useForm()

	const handleSubmitPagination = (data) => {
		setPageSelected(1)
		setArray([1, 2, 3, 4, 5])
		setDataSearch(data.search)
	}

	return (
		<>
			<div className='flex justify-end py-2'>
				<form onSubmit={handleSubmit(handleSubmitPagination)}>
					<InputSearch register={register} />
				</form>
			</div>
			<BoardComponent dataHeader={tableTitle} dataBody={arrayNotification.notifications.result} />
			<div className='py-5 flex justify-center items-center'>
				<PaginationComponent
					pageSelected={pageSelected}
					dataPagination={arrayNotification.notifications.info}
					setPageSelected={setPageSelected}
				/>
			</div>
		</>
	)
}
