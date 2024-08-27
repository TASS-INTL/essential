import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'

export const CreateService = () => {
	const { register, handleSubmit } = useForm()

	//logic new

	return (
		<div className='pt-10 px-10'>
			<h2 className='pb-5 text-center text-3xl'>Nuevo serivicio</h2>
			<form onSubmit={handleSubmit()}>{/* SEND SERVICE */}</form>
		</div>
	)
}
