import React from 'react'

import { useForm } from 'react-hook-form'

import { InputComponent, InputSubmitComponent, ModalComponent } from '@/Components'


export const FormCreateCentralModal = ({ modalVisible, handleOnClose, handleCreateCentral }) => {
    const { register, handleSubmit, reset } = useForm()

    const handleSendDataNewCentral = (data, event) => {
        handleCreateCentral(data, event, reset)
    }

    return (
        <ModalComponent
            handleOpen={modalVisible}
            HandleClose={handleOnClose}
            titleModal={'Creacion de nueva central'}
        >
            <form onSubmit={handleSubmit(handleSendDataNewCentral)}>
                <div className='grid grid-cols-2 gap-5 mx-10'>
                    <InputComponent
                        color
                        register={register}
                        defaultValue={''}
                        required
                        type='text'
                        name='name'
                        label='Nombre'
                        placeholder='Central 1'
                    />
                    <InputComponent
                        color
                        register={register}
                        defaultValue={''}
                        required
                        label='Descripcion'
                        name='description'
                        type='text'
                        placeholder='Ninguna'
                    />
                </div>
                <div className='flex justify-center mt-5'>
                    <InputSubmitComponent value='Crear central' />
                </div>
            </form>
        </ModalComponent>
    )
}
