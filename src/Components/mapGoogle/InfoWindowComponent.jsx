import { InfoWindow } from '@vis.gl/react-google-maps'

export const InfoWindowComponent = ({ marker, maxWidth, onCloseClick, permission, position }) => {
	return (
		<InfoWindow
			anchor={marker ? marker : ''}
			maxWidth={maxWidth}
			onCloseClick={() => onCloseClick(false)}
			position={position ? position : null}
		>
			<div className='p-2'>
				{permission.map((item) => (
					<div key={item._id} div className='flex justify-center items-center'>
						<div className='p-3'>{item.name_consult}</div>
						<div className='relative inline-block w-11 h-5'>
							<input
								value={item.values.value}
								id={item._id}
								type='checkbox'
								className='peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300'
							/>
							<label
								htmlFor={item._id}
								className='absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer'
							></label>
						</div>
					</div>
				))}
			</div>
		</InfoWindow>
	)
}
