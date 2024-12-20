import { useState } from 'react'

import { METHODS_API } from '@/Api/constantsApi'
import { useApi } from '@/Api/useApi'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export const usePolicies = () => {
	const { requestApi } = useApi()

	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)
	const [search, setSearch] = useState('')
	const { register, handleSubmit } = useForm()
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(!open)

	const getPolicies = ({ page, limit, search }) =>
		useQuery({
			queryKey: ['getPoliciesMaster', page, limit, search],
			queryFn: async () =>
				await requestApi(
					METHODS_API.GET,
					`module/policies/master?page=${page}&limit=${limit}&search=${search === '' ? `${search}` : ''}`
				)
		})

	const handleSubmitPagination = (data) => {
		setSearch(data.search)
	}

	const listPolicies = getPolicies({ page, limit, search })

	return {
		listPolicies,
		register,
		handleSubmit,
		handleSubmitPagination,
		open,
		setOpen,
		handleOpen
	}
}
