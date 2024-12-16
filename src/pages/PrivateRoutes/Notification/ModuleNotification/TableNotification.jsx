import React, { useState } from 'react'

import { BoardComponent, ErrorComponent, LoaderComponent, PaginationComponent } from '@/Components'
import { InputSearch } from '@/Components/InputSearch'
import { notificationStore } from '@/store/notificationStore'
import { useForm } from 'react-hook-form'

import { tableTitle } from '../../constants/constants'

export const TableNotification = () => {
	const arrayNotification = notificationStore((state) => state.arrayNotification)
	const [pageSelected, setPageSelected] = useState(1)
	const { register, handleSubmit } = useForm()

	const handleSubmitPagination = (data) => {}

	if (arrayNotification === null) return <LoaderComponent />

	if (arrayNotification?.error) return <ErrorComponent error={arrayNotification?.message} />

	return (
		<div className='px-16 py-7'>
			<div className='flex justify-end py-2'>
				<form onSubmit={handleSubmit(handleSubmitPagination)}>
					<InputSearch register={register} />
				</form>
			</div>
			<BoardComponent dataHeader={tableTitle} dataBody={arrayNotification?.notifications?.result} />
			<div className='py-5 flex justify-center items-center'>
				<PaginationComponent
					pageSelected={pageSelected}
					dataPagination={arrayNotification.notifications.info}
					setPageSelected={setPageSelected}
				/>
			</div>
		</div>
	)
}
