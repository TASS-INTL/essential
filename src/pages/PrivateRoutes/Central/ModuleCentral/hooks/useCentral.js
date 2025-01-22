import { useState } from 'react'
import { METHODS_API } from '@/Api/constantsApi'
import { useApi } from '@/Api/useApi'
import { showToast } from '@/helpers/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { queryClient } from '../../../../../routes/AppRouter'


export const useCentral = () => {
    const [methodForm, setMethodForm] = useState('create')
    const [modalVisible, setModalVisible] = useState(false)
    const { register, handleSubmit } = useForm()

    // pagination
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const { requestApi } = useApi()

    const fetchDataCentersMaster = ({ page, limit, search }) =>
        useQuery({
            queryKey: ['getCentersList', page, limit, search],
            queryFn: async () =>
                await requestApi(
                    METHODS_API.GET,
                    `module/centers?page=${page}&limit=${limit}&search=${search === '' ? '' : search}`
                )
        })

    const actionFetchCentersMaster = fetchDataCentersMaster({ page, limit, search })
    console.log(`actionFetchCentersMaster ${JSON.stringify(actionFetchCentersMaster)}`)

    const createCentralMaster = useMutation({
        mutationFn: async (data) => await requestApi(METHODS_API.POST, 'module/centers/create', data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getCentersList'], exact: false })
    })

    const handleCreateCentral = async (data, event, reset) => {
        event.preventDefault()

        const newCentral = data
        console.log(`newCentral ${newCentral}`)
        const response = await createCentralMaster.mutateAsync(newCentral)
        console.log(`response handleCreateCentral ${response}`)

        if (response.completed) {
            showToast('Central creada correctamente', 'success')
            reset()
            setModalVisible(false)
            actionFetchCentersMaster.refetch()
        }
        if (response?.error && response?.type_==='CENTRAL_NAME_EXISTS') {
            showToast('El nombre de la central ya existe', 'error')
            return;
        }

        response?.error && showToast(response?.error?.message, 'error')
    }

    const handleOpenModal = () => setModalVisible(true)

    const handleOnClose = () => setModalVisible(!modalVisible) 

    const onActionButtonCreateUser = () => {
        setMethodForm('create')
        handleOpenModal()
    }

    const onActionFormPagination = (data) => {
        setSearch(data.search)
    }

    return {
        register,
        handleSubmit,
        handleOnClose,
        onActionFormPagination,
        methodForm,
        modalVisible,
        handleOpenModal,
        actionFetchCentersMaster,
        onActionButtonCreateUser,
        handleCreateCentral
    }
}