import { useCallback, useState } from 'react'

import { io } from 'socket.io-client'

import { userStore } from '../../../store/userStore'

export const useSocketInventory = () => {
	const { uid, tokenSesion } = userStore((state) => state.userData)
	const [socketInventory, setSocketInventory] = useState(null)

	const connnectSocketDevice = useCallback(() => {
		const socketTemp = io('https://skolympo.tassintl.com/device', {
			reconnectionDelayMax: 1000,
			transports: ['websocket'],
			autoConnect: true,
			auth: { x_access_token: tokenSesion }
		})
		return socketTemp
	}, [])

	return { connnectSocketDevice }
}
