import React, { useState } from 'react'

import { ErrorComponent, LoaderComponent } from '@/Components'
import { Container } from '@/Components/Container'
import { InputSearch } from '@/Components/InputSearch'
import { DynamicTable } from '@/Components/DynamicTable'
import { CardsCentralScreen } from './CardsCentralScreen'

import { useCentral } from './hooks/useCentral'
import { FormCreateCentralModal } from './FormCreateCentralModal'


export const CentersScreen = () => {

    const {
        actionFetchCentersMaster,
        modalVisible,
        register,
        handleSubmit,
        onActionButtonCreateUser,
        onActionFormPagination,
        handleOnClose,
        handleCreateCentral
    } = useCentral()


    if (actionFetchCentersMaster.isLoading) return <LoaderComponent />

    if (actionFetchCentersMaster.isError) return <ErrorComponent error={actionFetchCentersMaster?.error?.message} />


    return (
        <Container>
            <div className='pl-[5%] px-7 py-4'>
                <div className='flex justify-between'>
                    <form className='flex gap-3' onSubmit={handleSubmit(onActionFormPagination)}>
                        <InputSearch register={register} placeholder='Buscar central' nameRegister='search' icon />
                        <InputSearch register={register} placeholder='Limite de busqueda' nameRegister='limit' />
                    </form>
                    <div className=' flex justify-between px-0 py-2'>
                        <button
                            onClick={onActionButtonCreateUser}
                            className='bg-primary shadow-lg  py-1 px-8 rounded-md text-white'
                        >
                            + Crear central
                        </button>
                    </div>
                </div>
            </div>

            <CardsCentralScreen dataList={actionFetchCentersMaster?.data?.data?.results} />
            {/* <DynamicTable dataBody={actionFetchCentersMaster?.data?.data?.results} /> */}
            <FormCreateCentralModal
                modalVisible={modalVisible}
                handleOnClose={handleOnClose}
                handleCreateCentral={handleCreateCentral}
            />

        </Container>
    )
}