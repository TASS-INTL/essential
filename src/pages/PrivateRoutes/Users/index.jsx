import React, { useEffect, useMemo, useRef, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

// import { usersStore } from '../../../store/usersStore'
// import { useUsers } from '../Hooks/useUser'

export const Users = () => {
	// const { getUserData } = useUsers()
	const [count, setCount] = useState(0)

	// ------- useQuery

	// const fetchUserList = useQuery(['getUserList'], async () => {
	// 	const response = await fetch('https://jsonplaceholder.typicode.com/users')
	// 	const data = await response.json()
	// 	return data
	// })

	// const {
	// 	data,
	// 	isLoading,
	// 	isError,
	// 	Error,
	// 	isSuccess,
	// } = fetchUserData

	// -------
	// ------- useMutation

	// const { mutateAsync, isLoading, isError, isSuccess, error } = useMutation(getUserData, {
	// 	onSuccess: (data) => {
	// 		reactQueryClient.invalidateQueries('getUserList')
	// 	}
	// })

	// const handleCreateUser = async () => {
	// 	const newUser = {
	// 		name: 'jose',
	// 		email: 'email@email.com'
	// 	}
	// 	await mutateAsync(newUser)
	// }

	// console.log(fetchUserList.data)

	// const data = usersStore((state) => state.dataUsers)

	// const numRandom = useMemo(() => Math.random(), [count])
	const numRandom2 = useRef(Math.random())

	// useEffect(() => {
	// 	getUserData()
	// }, [])

	const handleSum = () => {
		setCount((state) => state + 1)
		setCount((state) => state + 1)
		// setCount(count + 1)
	}

	return (
		<div>
			<div>{count}</div>
			<button onClick={handleSum}>sumar</button>
			<div>{numRandom2.current}</div>
		</div>
	)
}
