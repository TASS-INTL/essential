import React from 'react'

export const RowInformation = ({ title, info }) => {
	return (
		<span className=' font-medium text-sm flex justify-between'>
			{title}: <span className=' font-normal text-[0.7rem]'>{info}</span>
		</span>
	)
}
