import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import Autocomplete from 'react-google-autocomplete'
import { useForm } from 'react-hook-form'

import { emailSvg } from '../../../assets/assetsplatform'
import { InputComponent } from '../../../Components'

const DEFAULT_CENTER = { lat: 48.8566, lng: 2.3522 }
const DEFAULT_ZOOM = 7

export const GoogleMapsWrapper = ({ children }) => {
	// Ideally we want the apiKey to be fetch from an environment variable
	const apiKey = 'AIzaSyA0dFrFGq7FFTbSuuKYvj60JB1P_WvUuPI'

	if (!apiKey) {
		return <div>Cannot display the map: google maps api key missing</div>
	}

	return <Wrapper apiKey={apiKey}>{children}</Wrapper>
}

export const MapComponent = () => (
	<GoogleMapsWrapper>
		<GoogleMaps />
	</GoogleMapsWrapper>
)

export const GoogleMaps = () => {
	const ref = useRef(null)

	useEffect(() => {
		// Display the map
		if (ref.current) {
			new window.google.maps.Map(ref.current, {
				center: DEFAULT_CENTER,
				zoom: DEFAULT_ZOOM
			})
		}
	}, [ref])

	return <div ref={ref} className=' w-52 h-48 bg-black' />
}

export const CreateService = () => {
	const { register, handleSubmit } = useForm()
	const [value, setValue] = useState(dayjs('2022-04-17T15:30'))
	var formattedDate = format(value.$d, 'yyyy-MM-dd hh:mm:ss')

	return (
		<div className='pt-10'>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
					<DateTimePicker label='fecha de inicio' value={value} onChange={(newValue) => setValue(newValue)} />
					<DateTimePicker label='fecha de final' value={value} onChange={(newValue) => setValue(newValue)} />
				</DemoContainer>
			</LocalizationProvider>
			<form action=''>
				<label htmlFor=''>datos del conductor</label>
				<InputComponent
					required
					name='email'
					type='email'
					svg={emailSvg}
					register={register}
					label='Correo electronico'
					placeholder='name@gmail.com'
				/>
				{/* <InputComponent
					required
					name='license_plate'
					type='text'
					svg={emailSvg}
					register={register}
					label='Placa'
					placeholder='XXXXX'
				/>
				<InputComponent
					required
					name='name'
					type='text'
					svg={emailSvg}
					register={register}
					label='Nombre'
					placeholder='jhondue'
				/>
				<InputComponent
					required
					name='number_document'
					type='number'
					svg={emailSvg}
					register={register}
					label='numero de documento'
					placeholder='000 000 0000'
				/> */}
				<div>
					<div className='  p-3'>
						<label htmlFor=''>ingresa la direccion</label>
						<Autocomplete
							apiKey={'AIzaSyA0dFrFGq7FFTbSuuKYvj60JB1P_WvUuPI'}
							onPlaceSelected={(place) => console.log(place)}
							className=' w-full bg-black text-white'
						/>
					</div>
					<div>
						<GoogleMapsWrapper />
					</div>
				</div>
			</form>
		</div>
	)
}
