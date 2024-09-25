import { useState } from 'react'

import { InfoWindow } from '@vis.gl/react-google-maps'

export const InfoWindowComponent = ({
	marker,
	maxWidth,
	onCloseClick,
	permission,
	position,
	handleCheckboxChange,
	sendPermissionState
}) => {
	return (
		<InfoWindow
			headerContent={
				<>
					<button className='bg-black text-white p-2 rounded-lg' onClick={() => sendPermissionState()}>
						Guardar
					</button>
				</>
			}
			anchor={marker ? marker : ''}
			maxWidth={maxWidth}
			onCloseClick={() => onCloseClick(false)}
			position={position ? position : null}
		>
			<div className='p-2 '>
				{permission?.map((item) => (
					<ListItems
						key={item._id}
						_id={item._id}
						handleCheckboxChange={handleCheckboxChange}
						name_consult={item.name_consult}
						value={item.values.value}
					/>
				))}
			</div>
		</InfoWindow>
	)
}

const ListItems = ({ _id, handleCheckboxChange, name_consult, value }) => {
	const [stateItem, setStateItem] = useState(value)

	return (
		<div className='flex justify-center items-center'>
			<div className='p-3'>{name_consult}</div>
			<div className='relative inline-block w-11 h-5'>
				<input
					checked={stateItem}
					id={_id}
					type='checkbox'
					className='peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300'
					onChange={(e) => {
						setStateItem(!stateItem)
						handleCheckboxChange(e, _id)
					}}
				/>
				<label
					htmlFor={_id}
					className='absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer'
				></label>
			</div>
		</div>
	)
}
