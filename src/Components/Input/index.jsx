import React from 'react'

import './style.css'

export const Input = ({ label, name, type, value, onChange, placeholder }) => {
	return (
		<div className='mb-3'>
			<label htmlFor={name} className='form-label'>
				{label}
			</label>
			<input
				value={value}
				onChange={(e) => onChange(name, e.target.value)}
				type={type}
				className='SimpleInput-field'
				id={name}
				name={name}
				placeholder={placeholder}
			/>
			{/* {error && <div className="alert alert-danger">{error}</div>} */}
		</div>
	)
}
