import React, { useState, useCallback } from 'react'
import { InputComponent, InputSubmitComponent, RemarksInput, TitleWithLive, LoaderComponent } from '@/Components'
import { BoardDevice } from '@/Components/BoardDevice'
import { arrayTapMonitoring, TapBottons } from '@/Components/TapBottons'
import { travelsStore } from '@/store/travelsStore'
import { useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router-dom'
import { travelInfoStore } from '@/store/travels/travelInfoStore'
import { useOutletContext } from 'react-router-dom'
import { useTravels } from './hooks/useTravels'

export const Reports = () => {
	const location = useLocation()
	const { idTravel } = useParams()
	const { handleSendLogRegisterTravel } = useTravels()
	const reportsLogsTravelInfo = travelInfoStore((state) => state.reports)
	const { isLogEnabled, handleToggleLog, geofence, handleCleanGeo } = useOutletContext()


	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch
	} = useForm({
		defaultValues: {
			tags: [],
			coordinates: { lat: '', lng: '' }
		}
	})
	const [tags, setTags] = useState([])
	const [currentTag, setCurrentTag] = useState('')
	const [isExpanded, setIsExpanded] = useState(false)

	const sendFormDataLog = (data) => {

		const dataLog = {
			log: data.description,
			tags: data.tags,
			geofence: Object.values(geofence)[0],
		}

		handleSendLogRegisterTravel({ data: dataLog, idTravel })
		handleCleanGeo()

		// Clean campos
		setValue('description', '')
		setValue('tags', [])
		setTags([])
	}

	// const handleAddTag = () => {
	// 	console.log('handleAddTag')
	// }

	const handleAddTag = useCallback(() => {
		if (currentTag.trim()) {
			setTags(prevTags => {
				const newTags = [...prevTags, currentTag.trim()]
				setValue('tags', newTags)
				return newTags
			})
			setCurrentTag('')
		}
	}, [currentTag, setValue])

	// const handleRemoveTag = () => {
	// 	console.log('handleRemoveTag')
	// }

	const handleRemoveTag = useCallback((tagToRemove) => {
		setTags(prevTags => {
			const newTags = prevTags.filter(tag => tag !== tagToRemove)
			setValue('tags', newTags)
			return newTags
		})
	}, [setValue])

	// const handleToggleExpand = () => {
	// 	console.log('handleToggleExpand')
	// }

	const handleToggleExpand = useCallback(() => {
		setIsExpanded(prevState => {
			if (!prevState) {
				setValue('description', '')
				setTags([])
				setValue('tags', [])
			}
			return !prevState
		})
	}, [setValue])



	return (
		<div className='top-0 right-0 bg-white h-full w-3/21 p-3 pt-6'>
			<TapBottons
				location={location}
				idDevice={idTravel}
				path='travels-screen/travel'
				data={arrayTapMonitoring}
			/>
			<div className="w-full">
				<button
					type="button"
					onClick={handleToggleLog}
					className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200"
				>
					<span className="text-sm font-medium text-gray-700">
						Crear nuevo registro
					</span>
					<svg
						className={`w-5 h-5 transition-transform duration-200 ${isLogEnabled ? 'transform rotate-180' : ''
							}`}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>

				<div
					className={`transition-all duration-200 overflow-hidden ${isLogEnabled ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
						}`}
				>
					<form
						onSubmit={handleSubmit(sendFormDataLog)}
						className="mt-4 space-y-4"
					>
						<div className="space-y-4">
							{/* Descripción */}
							<div>
								<RemarksInput
									text="Descripción del reporte"
									register={register}
									nameRegister="description"
									required
								/>
							</div>

							{/* Etiquetas */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Etiquetas
								</label>
								<div className="flex flex-wrap gap-2 mb-2">
									{tags.map((tag, index) => (
										<span
											key={index}
											className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
										>
											{tag}
											<button
												type="button"
												onClick={() => handleRemoveTag(tag)}
												className="ml-2 text-blue-600 hover:text-blue-800"
											>
												×
											</button>
										</span>
									))}
								</div>
								<div className="flex gap-2">
									<input
										type="text"
										value={currentTag}
										onChange={(e) => setCurrentTag(e.target.value)}
										className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
										placeholder="Agregar etiqueta"
									/>
									<button
										type="button"
										onClick={handleAddTag}
										className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
									>
										Agregar
									</button>
								</div>
							</div>

							{/* Coordenadas opcionales */}
							{geofence && Object.keys(geofence).length > 0 && (
								<div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium text-gray-700">
											Geocerca seleccionada
										</span>
										<span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
											{Object.values(geofence)[0]?.type}
										</span>
									</div>
									{Object.values(geofence)[0]?.info?.coordinates_center && (
										<div className="text-sm text-gray-600">
											<p>Lat: {Object.values(geofence)[0]?.info?.coordinates_center[1]}</p>
											<p>Lng: {Object.values(geofence)[0]?.info?.coordinates_center[0]}</p>
										</div>
									)}
								</div>
							)}
						</div>

						<div className="flex justify-center">
							<InputSubmitComponent text="Enviar Reporte" />
						</div>
					</form>
				</div>
			</div>
			<div className='p-5'>
				<TitleWithLive title='Notas de seguimiento' inLive />
				{reportsLogsTravelInfo === null ? (
					<LoaderComponent />
				) : (
					<div className="space-y-4 mt-4">
						{reportsLogsTravelInfo?.data?.results.map((log) => (
							<div
								key={log._id}
								className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
							>
								<div className="flex justify-between items-start mb-2">
									<div>
										<h3 className="font-medium text-gray-900">{log.name_user}</h3>
										<p className="text-sm text-gray-500">
											{new Date(log.date).toLocaleString()}
										</p>
									</div>
									<span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
										{log.geofence.type}
									</span>
								</div>

								<p className="text-gray-700 mb-3">{log.log}</p>

								{log.tags.length > 0 && (
									<div className="flex flex-wrap gap-2">
										{log.tags.map((tag, index) => (
											<span
												key={index}
												className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
											>
												{tag}
											</span>
										))}
									</div>
								)}

								{log.geofence.info.coordinates_center.length > 0 && (
									<div className="mt-2 text-xs text-gray-500">
										Coordenadas: {log.geofence.info.coordinates_center.join(', ')}
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
