import React from 'react'

import { LiveIndicator } from './LiveIndicator'

export const TitleWithLive = ({ title, inLive }) => {
	return (
		<div className='py-2 flex justify-between px-2 items-center'>
			<span>{title}</span>
			{inLive && (
				<>
					<div className='flex justify-center items-center'>
						<span>ACTUALIZACION EN TIEMPO REAL</span>
						<LiveIndicator />
					</div>
				</>
			)}
		</div>
	)
}
