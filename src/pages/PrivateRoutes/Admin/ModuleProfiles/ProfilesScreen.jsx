import React from 'react'

import { ErrorComponent, LoaderComponent, ModalComponent } from '@/Components'
import { Container } from '@/Components/Container'
import { InputSearch } from '@/Components/InputSearch'

import { CreateProfile } from './CreateProfile'
import { useProfile } from './hooks/useProfile'
import { CardsProfilesScreen } from './CardProfileScreen'

export const ProfilesScreen = () => {
	const { listProfiles, handleSubmitPagination, open, setOpen, handleOpen, register, handleSubmit, refetchListProfiles } = useProfile()


	if (listProfiles.isLoading) return <LoaderComponent />

	if (listProfiles.isError || listProfiles?.data?.error)
		return <ErrorComponent error={listProfiles?.error?.message || listProfiles?.data?.message} />

	return (
		<Container>
			<div className='pl-[5%] px-7 py-4'>
				<div className='flex justify-between'>
					<form onSubmit={handleSubmit(handleSubmitPagination)}>
						<InputSearch register={register} placeholder='Buscar politica' nameRegister='search' icon/>
					</form>
					<div className=' flex justify-between px-0 py-2'>
						<button onClick={handleOpen} className='bg-primary shadow-lg  py-1 px-8 rounded-md text-white'>
							+ Craer Perfil
						</button>
					</div>
				</div>
				<CardsProfilesScreen dataList={listProfiles?.data?.data?.results} />
			</div>

			<ModalComponent handleOpen={open} HandleClose={handleOpen} titleModal='Creacion de perfiles'>
				<CreateProfile refetchProfiles={refetchListProfiles} />
			</ModalComponent>
		</Container>
	)
}
