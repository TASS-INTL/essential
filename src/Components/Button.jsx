import React, { useContext } from 'react'

import { SocketContext } from '../pages/PrivateRoutes/sockets/socketProvider'

const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }) => {
	const { setIsClicked, initialState } = useContext(SocketContext)

	return (
		<button
			type='button'
			onClick={() => setIsClicked(initialState)}
			style={{ backgroundColor: bgColor, color, borderRadius }}
			className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
		>
			{icon} {text}
		</button>
	)
}

export default Button
