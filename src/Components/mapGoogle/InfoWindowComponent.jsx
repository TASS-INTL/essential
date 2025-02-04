import { useState } from 'react'

import { showToast } from '@/helpers/toast'
import { InfoWindow } from '@vis.gl/react-google-maps'

export const InfoWindowComponent = ({
	marker,
	maxWidth,
	permission,
	permissionCurrent,
	onSaveClick,
	onCloseClick
}) => {
	const copyArrayPermission = JSON.parse(JSON.stringify(permission))


	console.log("permissionCurrent: ", permissionCurrent)

	const handleCheckboxChange = (event, _id) => {
		const isChecked = event.target.checked
		for (const permission of copyArrayPermission) {
			if (permission._id === _id) {
				permission.values.value = isChecked
			}
		}
	}

	const handleDateChange = (_id, date) => {
		for (const permission of copyArrayPermission) {
			if (permission._id === _id) {
				permission.values.date = date;
			}
		}
	}

	const sendPermissionState = () => {
		console.log('copyArrayPermission', copyArrayPermission)
		// showToast('!se a guardado de manera exitosa!', 'success')
		onSaveClick(copyArrayPermission)

	}
	const handleCloseClick = () => {
		console.log('close', copyArrayPermission)

		onCloseClick(copyArrayPermission)
	}

	return (
		<InfoWindow
			headerContent={
				<button className='bg-black text-white p-2 rounded-lg' onClick={sendPermissionState}>
					Guardar
				</button>
			}
			anchor={marker || ''}
			maxWidth={maxWidth}
			onCloseClick={() => handleCloseClick()}
		>
			<div className='p-2 max-h-[300px] overflow-y-auto w-[300px]'>
				{
					permissionCurrent.length > 0 ?
						permissionCurrent.map((item) => (
							<ListItems
								key={item._id}
								_id={item._id}
								handleCheckboxChange={handleCheckboxChange}
								handleDateChange={handleDateChange}
								nameConsult={item.name_consult}
								value={item.values.value}
								date={item.values.date}
								isDateField={item.name.startsWith('date_')}
							/>
						)) : permission?.
							map((item) => (
								<ListItems
									key={item._id}
									_id={item._id}
									handleCheckboxChange={handleCheckboxChange}
									handleDateChange={handleDateChange}
									nameConsult={item.name_consult}
									value={item.values.value}
									date={item.values.date}
									isDateField={item.name.startsWith('date_')}
								/>
							))
				}


				{/* {permission?.map((item) => (
					<ListItems
						key={item._id}
						_id={item._id}
						handleCheckboxChange={handleCheckboxChange}
						handleDateChange={handleDateChange}
						nameConsult={item.name_consult}
						value={item.values.value}
						date={item.values.date}
						isDateField={item.name.startsWith('date_')}
					/>
				))} */}
			</div>
		</InfoWindow>
	)
}

const ListItems = ({ 
    _id, 
    handleCheckboxChange, 
    handleDateChange,
    nameConsult, 
    value,
    date,
    isDateField 
}) => {
    const [stateItem, setStateItem] = useState(value)

    return (
        <div className='flex flex-col mb-2 border-b border-gray-100 pb-2'>
            <div className='flex justify-between items-center w-full'>
                <div className='text-sm'>{nameConsult}</div>
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
            {isDateField && stateItem && (
                <div className='mt-2'>
                    <input
                        type="datetime-local"
                        value={date ? date.slice(0, 16) : ''}
                        onChange={(e) => handleDateChange(_id, e.target.value)}
                        className='w-full p-1 text-sm border rounded focus:outline-none focus:border-slate-800'
                    />
                </div>
            )}
        </div>
    )
}
