import { Navigate } from 'react-router-dom'

import { AuthRouter } from './AuthRouter'
import { routesRedirect } from './constants'


export const PublicRouter = ({ isAuthenticated }) => {
	return isAuthenticated ? <Navigate to={routesRedirect.redirectUser} /> : <AuthRouter />
}
