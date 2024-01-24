import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { Landing } from '../pages/LandingPage'
import { userStore } from '../store/userStore'
import { PrivateRouter } from './PrivateRouter'
import { PublicRouter } from './PublicRouter'

export const AppRouter = () => {
	const userData = userStore((state) => state.userData)
	return (
		<Routes>
			<Route path='/' element={<Landing />} />
			<Route path='/auth/*' element={<PublicRouter isAuthenticated={userData.logged} />} />
			<Route path='/user/*' element={<PrivateRouter isAuthenticated={userData.logged} />} />
		</Routes>
	)
}
