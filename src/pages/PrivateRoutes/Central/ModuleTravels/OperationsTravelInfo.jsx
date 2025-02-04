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
    console.log('generalTravelInfo operations', generalTravelInfo?.data?.operations)
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
                    <div key={operation._id} className="bg-white rounded-lg shadow-md p-4 w-96 border-l-4 border-purple-500 hover:shadow-lg transition-shadow duration-300 mt-4">
                        {/* Header with main info */}
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h2 className="font-bold text-lg">{operation.did}</h2>
                                <h3 className="font-bold text-lg">{operation.type}</h3>
                                <p className="text-sm text-gray-500">ID: {operation._id}</p>
                                <p className="text-sm text-gray-500">User: {operation.name_installer}</p>

                            </div>
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    operation.status === 'completed'
                                        ? 'bg-green-100 text-green-800'
                                        : operation.status === "IN_PROGRESS"
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                }`}
                            >
                                {operation.status}
                            </span>
                        </div>

                        {/* Info and dates in compact form */}
                        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                            <p className="text-gray-600">
                                <span className="font-medium">Creado:</span>{' '}
                                {operation.created_at}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Actualizado:</span>{' '}
                                {operation.updated_at}
                            </p>
                        </div>

                        {/* Procesos with accordion */}
                        <div className="mb-3">
                            <details className="group">
                                <summary className="flex justify-between items-center cursor-pointer list-none p-2 bg-gray-50 rounded-lg">
                                    <span className="font-medium">Procesos ({operation.process.length})</span>
                                    <span className="transform group-open:rotate-180 transition-transform">
                                        ▼
                                    </span>
                                </summary>
                                <div className="mt-2 space-y-2">
                                    {operation.process.map((proc, index) => (
                                        <div key={index} className="bg-white p-3 rounded-lg border border-gray-100">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="font-medium">{proc.type_}</p>
                                                    <p className="text-sm text-gray-600">{proc.description}</p>
                                                </div>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                        proc.status === 'completed'
                                                            ? 'bg-green-100 text-green-800'
                                                            : proc.status === "PENDING"
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {proc.status}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-xs text-gray-500">
                                                    Actualizado: {new Date(proc.updated_at).toLocaleDateString()}
                                                </span>
                                                <button
                                                    onClick={() => console.log('Process clicked:', proc)}
                                                    className="text-xs px-3 py-1 bg-blue-500 text-white rounded-20 hover:bg-black hover:text-white hover:shadow-md transition-all duration-300"
                                                >
                                                    Validar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={handleGoToOperation}
                                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-black transition-colors duration-300 text-sm"
                            >
                                Ver Operación
                            </button>
                            <button
                                onClick={() => console.log('Operation details:', operation)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-300"
                            >
                                ⋮
                            </button>
                        </div>
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