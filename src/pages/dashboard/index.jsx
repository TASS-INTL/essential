import { useAuthProvider } from '../../auth/useAuthProvider'
import { userStore } from '../../store/userStore'

export const Dasboard = () => {
	const { userData, setUserData } = userStore((state) => state)
	const { logout } = useAuthProvider()

	return (
		<div>
			<button onClick={() => logout(setUserData)} className='button'>
				cerrar sesion
			</button>
			<h1>Dashboard</h1>
			<h2>Hola!! {userData.name}</h2>
		</div>
	)
}
