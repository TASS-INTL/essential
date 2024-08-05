import React, { useEffect, useState } from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MapLibreSearchControl } from '@stadiamaps/maplibre-search-box'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'

import { emailSvg } from '../../../assets/assetsplatform'
import { InputSubmitComponent } from '../../../Components'
import { InputComponent } from '../../../Components/InputComponent'
import { Map } from '../components/Map'
import { useMap } from '../Hooks/useMap'
import { useServiceClient } from './hooks/useServiceClient'

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
