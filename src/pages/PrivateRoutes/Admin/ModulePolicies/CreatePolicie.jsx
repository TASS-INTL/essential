import React from 'react'
import { ErrorComponent, InputComponent, InputSubmitComponent, LoaderComponent, RemarksInput } from '@/Components'
import { useCreatePolicie } from './hooks/useCreatePolicie'

export const CreatePolicie = ({ refetchPolicies }) => {
  const {
    dataPreCreatePolicie,
    dataProcessinForCreatePolicies,
    register,
    handleSubmit,
    handleCreatePolicies,
    handleCheckboxChange,
    handleCheckboxChangeSubItem
  } = useCreatePolicie()

  if (dataPreCreatePolicie.isLoading) return <LoaderComponent />

  if (dataPreCreatePolicie.isError || dataPreCreatePolicie.data.error)
    return <ErrorComponent error={dataPreCreatePolicie?.error?.message || dataPreCreatePolicie?.data?.message} />

  const handleCreate = async (data, event) => {
    await handleCreatePolicies(data, event)
    refetchPolicies()
  }

  return (
    <div className='overflow-y-auto max-h-[80vh]'>
      <form onSubmit={handleSubmit(handleCreate)} className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <InputComponent
              required
              name='name'
              type='text'
              register={register}
              label='Nombre de la política'
              placeholder='Operador administrativo'
              color
            />
            <RemarksInput text='Descripción' register={register} nameRegister='description' />
          </div>
          <div className='overflow-y-auto max-h-[60vh] space-y-4'>
            <span className='block mb-2 font-semibold text-gray-700'>Selecciona los módulos</span>
            {dataProcessinForCreatePolicies?.map((item) => (
              <div key={item._id} className='mb-4'>
                <div className='flex items-center mb-2'>
                  <input
                    id={item._id}
                    type='checkbox'
                    checked={item.isActive}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                    onChange={(event) => handleCheckboxChange(event, item._id)}
                  />
                  <label htmlFor={item._id} className='ml-2 text-sm font-medium text-gray-900'>
                    {item.name_consult}
                  </label>
                </div>
                {item.isActive && (
                  <div className='ml-6'>
                    {item.submodules.map((subItem) => (
                      <div key={subItem._id} className='flex items-center mb-2'>
                        <input
                          id={subItem._id}
                          type='checkbox'
                          checked={subItem.isActive}
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                          onChange={(event) => handleCheckboxChangeSubItem(event, item._id, subItem._id)}
                        />
                        <label htmlFor={subItem._id} className='ml-2 text-sm font-medium text-gray-900'>
                          {subItem.name_consult}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className='flex justify-center'>
          <InputSubmitComponent text='Crear Política' />
        </div>
      </form>
    </div>
  )
}
