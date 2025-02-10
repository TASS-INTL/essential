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
import { LoaderComponent } from '@/Components'


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

    const [deviceId, setDeviceId] = useState('')
    const [formFields, setFormFields] = useState({})
    const [photos, setPhotos] = useState([])


    const handleDeviceAssignment = (procId, action) => {
        if (!deviceId.trim()) return
        console.log(`${action} device:`, { procId, deviceId })
        // Aquí iría la lógica para asignar/desvincular el dispositivo
    }

    const handleFieldChange = (key, subKey, value) => {
        setFormFields(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                [subKey]: value
            }
        }))
    }

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files)
        setPhotos(prev => [...prev, ...files])
    }

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
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${operation.status === 'completed'
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
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${proc.status === 'completed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : proc.status === "PENDING"
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {proc.status}
                                                </span>
                                            </div>

                                            {/* Campos específicos según el tipo de proceso */}
                                            {(proc.type_ === 'ASSIGING_DEVICE' || proc.type_ === 'UNLINK_DEVICE') && (
                                                <div className="mt-3 flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={deviceId}
                                                        onChange={(e) => setDeviceId(e.target.value)}
                                                        placeholder="ID del dispositivo"
                                                        className="flex-1 border rounded-md px-3 py-1 text-sm"
                                                    />
                                                    <button
                                                        onClick={() => handleDeviceAssignment(proc._id, proc.type_)}
                                                        className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
                                                    >
                                                        {proc.type_ === 'ASSIGING_DEVICE' ? 'Asignar' : 'Desvincular'}
                                                    </button>
                                                </div>
                                            )}

                                            {proc.type_ === 'COMPLETED_INFORMATION' && operation.fields_incomplete && (
                                                <div className="mt-3 space-y-3">
                                                    {Object.entries(operation.fields_incomplete).map(([key, value]) => {
                                                        if (typeof value === 'object') {
                                                            return (
                                                                <div key={key} className="space-y-2">
                                                                    <h4 className="font-medium text-sm">{key}</h4>
                                                                    {Object.entries(value).map(([subKey, subValue]) => (
                                                                        <div key={`${key}-${subKey}`} className="flex gap-2">
                                                                            <label className="text-sm text-gray-600 min-w-[120px]">
                                                                                {subKey}:
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                defaultValue={subValue}
                                                                                onChange={(e) => handleFieldChange(key, subKey, e.target.value)}
                                                                                className="flex-1 border rounded-md px-2 py-1 text-sm"
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )
                                                        } else {
                                                            return (
                                                                <div key={key} className="flex gap-2">
                                                                    <label className="text-sm text-gray-600 min-w-[120px]">
                                                                        {key}:
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        defaultValue={value}
                                                                        onChange={(e) => handleFieldChange(key, null, e.target.value)}
                                                                        className="flex-1 border rounded-md px-2 py-1 text-sm"
                                                                    />
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                            )}

                                            {proc.type_ === 'PHOTOS_TAKEN' && (
                                                <div className="mt-3 space-y-2">
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        onChange={handlePhotoUpload}
                                                        className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                                                    />
                                                    {photos.length > 0 && (
                                                        <div className="flex gap-2 flex-wrap">
                                                            {photos.map((photo, idx) => (
                                                                <div key={idx} className="relative">
                                                                    <img
                                                                        src={URL.createObjectURL(photo)}
                                                                        alt={`Preview ${idx + 1}`}
                                                                        className="w-20 h-20 object-cover rounded"
                                                                    />
                                                                    <button
                                                                        onClick={() => setPhotos(prev => prev.filter((_, i) => i !== idx))}
                                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                                                    >
                                                                        ×
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

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