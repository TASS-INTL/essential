import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { arrayTapMonitoring, TapBottons } from '@/Components/TapBottons'
import { useLocation, useParams } from 'react-router-dom'
import { travelInfoStore } from '@/store/travels/travelInfoStore'
import { TitleWithLive } from '@/Components'
import { ButtonOlympoUI } from '@/Components/ui/ButtonOlympoUI'
import { Modal } from 'flowbite-react'
import { ModalOlympo } from '@/Components/ui/ModalOlympo'
import { SelectComponent } from '@/Components'
import { useTravels } from './hooks/useTravels'


export const OperationsTravelInfo = () => {
    const location = useLocation()
    const { idTravel } = useParams()
    const [isOpen, setIsOpen] = useState(false)
    const generalTravelInfo = travelInfoStore((state) => state.general)
    const { getDataPreCreateTravel, addOperationHandler } = useTravels()
    const dataPreCrateTravel = getDataPreCreateTravel()
    const { register, handleSubmit, reset } = useForm()

    const [selectedInstaller, setSelectedInstaller] = useState(null)
    const [selectedOperation, setSelectedOperation] = useState(null)

    const handleCloseModal = () => {
        setIsOpen(false)
        // reset form here and clear input
        reset()

    }

    const handleOperationSelection = (e) => {
        const operationId = e.target.value
        const operation = dataPreCrateTravel?.data?.data?.type_operations.find(
            op => op._id === operationId
        )
        setSelectedOperation(operation)
    }

    const handleInstallerSelectionAndAdd = (e) => {
        const installerId = e.target.value
        const installer = dataPreCrateTravel?.data?.data?.installers.find(
            inst => inst._id === installerId
        )
        setSelectedInstaller(installer)
    }
    const operations = [{
        _id: 'op123',
        did: 'dev456',
        status: 'in_progress',
        information: 'Operación de mantenimiento',
        process: [
            {
                type: 'Instalación',
                description: 'Instalación de software',
                number: 1,
                status: 'completed',
                created_at: '2023-10-01T10:00:00Z',
                updated_at: '2023-10-01T12:00:00Z',
            },
            {
                type: 'Configuración',
                description: 'Configuración de red',
                number: 2,
                status: 'in_progress',
                created_at: '2023-10-01T12:00:00Z',
                updated_at: '2023-10-01T14:00:00Z',
            },
            {
                type: 'Pruebas',
                description: 'Pruebas de funcionamiento',
                number: 3,
                status: 'pending',
                created_at: '2023-10-01T14:00:00Z',
                updated_at: '2023-10-01T14:00:00Z',
            },
        ],
        created_at: '2023-10-01T10:00:00Z',
        updated_at: '2023-10-01T14:00:00Z',
    }]
    console.log('generalTravelInfo operations', generalTravelInfo?.data?.operations.length)
    const handleGoToOperation = () => {
        console.log('Ir a la operación')
        dataPreCrateTravel.refetch()
    }

    const handleCreateOperation = (data) => {
        const operation = dataPreCrateTravel?.data?.data?.type_operations.find(
            op => op._id === data.type_operations
        )
        const installer = dataPreCrateTravel?.data?.data?.installers.find(
            inst => inst._id === data.installer
        )

        const dataForAddOperation = {
            'type_operation': operation.name,
            'installer': {
                'id_installer': installer._id,
                'name': installer.name,
            }
        }

        console.log('dataForAddOperation', dataForAddOperation, idTravel)

        addOperationHandler(dataForAddOperation, idTravel)
    }

    return (
        <div className='bg-white p-3 pt-6 min-w-[500px]'>
            <TapBottons
                location={location}
                idDevice={idTravel}
                path='travels-screen/travel'
                data={arrayTapMonitoring}
            />
            <div className='relative h-[81%]'>
                <TitleWithLive title='OPERACIONES' inLive />
                <ButtonOlympoUI
                    handleOnClick={() => setIsOpen(true)}
                    text={'Añadir operacion'}
                />
                {generalTravelInfo === null ? <LoaderComponent /> : generalTravelInfo?.data?.operations.length === 0 ? null : generalTravelInfo?.data?.operations.map((operation) => (
                    <div key={operation._id} className="bg-white rounded-lg shadow-md p-6 w-96 border-l-4 border-purple-500 hover:shadow-lg transition-shadow duration-300">
                        {/* Información principal */}
                        <div className="space-y-2 mb-4">
                            <p className="text-gray-700">
                                <span className="font-bold">ID:</span> {operation._id}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-bold">DID:</span> {operation.did}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-bold">Estado:</span>{' '}
                                <span
                                    className={`font-semibold ${operation.status === 'completed'
                                        ? 'text-green-500'
                                        : operation.status === 'in_progress'
                                            ? 'text-yellow-500'
                                            : 'text-red-500'
                                        }`}
                                >
                                    {operation.status}
                                </span>
                            </p>
                            <p className="text-gray-700">
                                <span className="font-bold">Información:</span> {operation.information}
                            </p>
                        </div>

                        {/* Procesos */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg text-gray-800 mb-2">Procesos</h3>
                            <div className="space-y-3">
                                {operation.process.map((proc, index) => (
                                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-gray-700">
                                            <span className="font-bold">Tipo:</span> {proc.type}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-bold">Descripción:</span> {proc.description}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-bold">Número:</span> {proc.number}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-bold">Estado:</span>{' '}
                                            <span
                                                className={`font-semibold ${proc.status === 'completed'
                                                    ? 'text-green-500'
                                                    : proc.status === 'in_progress'
                                                        ? 'text-yellow-500'
                                                        : 'text-red-500'
                                                    }`}
                                            >
                                                {proc.status}
                                            </span>
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-bold">Creado:</span>{' '}
                                            {new Date(proc.created_at).toLocaleString()}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-bold">Actualizado:</span>{' '}
                                            {new Date(proc.updated_at).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fechas de creación y actualización */}
                        <div className="text-sm text-gray-600 mb-4">
                            <p>
                                <span className="font-bold">Creado:</span>{' '}
                                {new Date(operation.created_at).toLocaleString()}
                            </p>
                            <p>
                                <span className="font-bold">Actualizado:</span>{' '}
                                {new Date(operation.updated_at).toLocaleString()}
                            </p>
                        </div>

                        {/* Botón para ir a la operación */}
                        <button
                            onClick={handleGoToOperation}
                            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors duration-300"
                        >
                            Ver Operación
                        </button>
                    </div>
                ))}
                <ModalOlympo isOpen={isOpen} onClose={handleCloseModal} higth={70} width={70} modalTitle={'Agregar operacion'}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit(handleCreateOperation)}>
                            <div className="mb-4">
                                <SelectComponent
                                    required
                                    color
                                    register={register}
                                    label='Selecciona la operacion'
                                    name='type_operations'
                                    arrayOptions={dataPreCrateTravel?.data?.data?.type_operations}
                                    option='name'
                                    onChange={handleOperationSelection}
                                />
                            </div>
                            <div className="mb-4">
                                <SelectComponent
                                    required
                                    color
                                    register={register}
                                    label='Selecciona el instalador'
                                    name='installer'
                                    arrayOptions={dataPreCrateTravel?.data?.data?.installers}
                                    option='name'
                                    onChange={handleInstallerSelectionAndAdd}
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <input
                                    type="checkbox"
                                    id="keepLocation"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    {...register('keepLocation', { required: false })}
                                />
                                <label htmlFor="keepLocation" className="ml-2 text-sm text-gray-700">
                                    ¿Quiere dejar la ubicación de {selectedOperation?.name}?
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Crear
                            </button>
                        </form>
                    </div>
                </ModalOlympo>
            </div>
        </div>
    )
}