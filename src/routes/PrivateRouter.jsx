import { Navigate } from 'react-router-dom'

import { Dasboard } from '../pages/dashboard'

export const PrivateRouter = ({ isAuthenticated }) => {
	return isAuthenticated ? <Dasboard /> : <Navigate to='/auth/login' />
}
