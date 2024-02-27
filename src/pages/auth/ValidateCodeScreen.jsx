import React, { useState } from 'react'

import { InputComponent, InputSubmitComponent } from '@/Components'
// Small utility to merge class names.
import { clsx } from 'clsx'
import { OTPInput } from 'input-otp'
import { useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import { useAuth } from './hooks/useLogin'

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export const ValidateCodeScreen = () => {
	const { valueValidateCode, handleFormValidateCode, submitFormValidateCode, submitResendCode } = useAuth()
	const [counter, setCounter] = useState(0)

	const {
		state: { screen }
	} = useLocation()

	function Slot({ char, isActive }) {
		if (char !== null) {
			// setCounter(counter + 1)
		} else {
			// setCounter(counter - 1)
		}
		return (
			<div
				className={cn(
					'relative w-14  h-14 text-[2rem] text-white',
					'flex items-center justify-center',
					'transition-all duration-300',
					'border-border border-y border-r first:border-l first:rounded-l-md last:rounded-r-md',
					'group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20',
					'outline outline-0 outline-accent-foreground/20',
					{ 'outline-4 outline-accent-foreground': isActive }
				)}
			>
				{char !== null && <div>{char}</div>}
				{char === null && isActive && <FakeCaret />}
			</div>
		)
	}
	// console.log(counter)

	// You can emulate a fake textbox caret!
	function FakeCaret() {
		return (
			<div className='absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink'>
				<div className='w-px h-8 bg-white' />
			</div>
		)
	}

	// Inspired by Stripe's MFA input.
	function FakeDash() {
		return (
			<div className='flex w-5 justify-center items-center'>
				<div className='w-10 h-1 rounded-full bg-border' />
			</div>
		)
	}

	return (
		<div className='bg-primary min-h-screen  items-center justify-center  space-x-6'>
			<div className='min-h-screen p-6 flex flex-col items-center justify-center'>
				<div className='w-1/1 md:w-1/3'>
					<div className='mb-7'>
						<h1 className='text-4xl font-bold text-white text-center'>Validacion de codigo</h1>
						<h2 className='text-2xl font-bold text-white text-center'>ingresa el codigo</h2>
					</div>
					<form action='flex flex-col' onSubmit={(event) => submitFormValidateCode(event, screen)}>
						<div className=' flex justify-center pb-10'>
							<OTPInput
								maxLength={6}
								containerClassName='group flex items-center has-[:disabled]:opacity-30'
								// onChange={(e) => console.log(e)}
								render={({ slots }) => (
									<>
										<div className='flex'>
											{slots.slice(0, 3).map((slot, idx) => (
												<Slot key={idx} {...slot} />
											))}
										</div>

										<FakeDash />

										<div className='flex'>
											{slots.slice(3).map((slot, idx) => (
												<Slot key={idx} {...slot} />
											))}
										</div>
									</>
								)}
							/>
						</div>
						{/* <InputComponent
							label='Validacion de codigo'
							name='code'
							type='number'
							value={valueValidateCode.code}
							onChange={handleFormValidateCode}
							error={'Ocurrio un error en el codigo de verificacion'}
						/> */}
						<div className='my-3 flex flex-row justify-center items-center'>
							<InputSubmitComponent text='Comprobar' />
						</div>
					</form>
					<p
						onClick={submitResendCode}
						className=' text-white text-center cursor-pointer hover:text-blue-300'
					>
						volver a enviar
					</p>
				</div>
			</div>
		</div>
	)
}
