import { useEffect } from 'react'

import { useUsers } from '../Hooks/useUser'

export const Dashboard = () => {
	const { getUserData } = useUsers()

	useEffect(() => {
		getUserData()
	}, [])

	return (
		<>
			<div className='h-screen flex-1 p-7'>
				<h1 className='text-2xl font-semibold '>Home Page</h1>
			</div>
		</>
	)
}
