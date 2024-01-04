import React, { useEffect } from 'react'

import { Route, Routes } from 'react-router-dom'

import { AuthProvider } from '../auth/authProvider'
import { Loader } from '../Components'
import { userStore } from '../store/userStore'
import { PrivateRouter } from './PrivateRouter'
import { PublicRouter } from './PublicRouter'

export const AppRouter = () => {
	const {
		userData: { logged, checking, ...state },
		setUserData
	} = userStore()

	const { verifyToken } = AuthProvider()

	useEffect(() => {
		verifyToken(state, setUserData)
	}, [])

	if (checking) return <Loader />

	return (
		<Routes>
			<Route path='/auth/*' element={<PublicRouter isAuthenticated={logged} />} />
			<Route path='/dashboard' element={<PrivateRouter isAuthenticated={logged} />} />
		</Routes>
	)
}
