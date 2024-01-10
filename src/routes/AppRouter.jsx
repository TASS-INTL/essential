import React, { useEffect } from 'react'

import { Route, Routes } from 'react-router-dom'

import { useAuthProvider } from '../auth/useAuthProvider'
import { Loader } from '../Components'
import { userStore } from '../store/userStore'
import { PrivateRouter } from './PrivateRouter'
import { PublicRouter } from './PublicRouter'

export const AppRouter = () => {
	const { userData, setUserData } = userStore()
	const { verifyToken } = useAuthProvider()

	useEffect(() => {
		verifyToken(userData, setUserData)
	}, [])

	if (userData.checking) return <Loader />

	return (
		<Routes>
			<Route path='/auth/*' element={<PublicRouter isAuthenticated={userData.logged} />} />
			<Route path='/dashboard' element={<PrivateRouter isAuthenticated={userData.logged} />} />
		</Routes>
	)
}
