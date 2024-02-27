import React, { Suspense, useRef, useState } from 'react'

import { OrbitControls, Stage } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'

import { discount } from '../../../assets/assetsLandin'
import styles from '../../../styles'
import { EarthCanvas } from './EarthCanvas'
import GetStarted from './GetStarted'
import Model from './Model'
import StarsCanvas from './Stars'

const Hero = () => {
	const ref = useRef()
	return (
		<section className={`flex md:flex-row flex-col ${styles.paddingY}`}>
			<div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
				<div className='flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2'>
					<img src={discount} alt='discount' className='w-[32px] h-[32px]' />
					<p className={`${styles.paragraph} ml-2`}>
						<span className='text-white'>20%</span> de descuento{' '}
						<span className='text-white'> para cuentas nuevas 1 mes</span>
					</p>
				</div>

				<div className='flex flex-row justify-between items-center w-full'>
					<h1 className='flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]'>
						La siguiente <br className='sm:block hidden' />{' '}
						<span className='text-gradient'>Generacion</span>{' '}
					</h1>
					<div className='ss:flex hidden md:mr-4 mr-0'>
						<GetStarted />
					</div>
				</div>

				<h1 className='font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full'>
					de Candados
				</h1>

				<p className={`${styles.paragraph} max-w-[470px] mt-5`}>
					&quot;En el futuro, la seguridad es sinónimo de innovación. Entra a un nuevo mundo de protección con
					nuestros candados inteligentes, fusionando la robustez del acero con la sofisticación de la
					tecnología. Tu tranquilidad, ahora con un toque futurista.&quot;
				</p>
			</div>

			<div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
				<div className='card relative w-[90%] h-[90%] '>
					<div className='group relative flex h-full w-full select-none items-center justify-center   ç  text-sm font-light text-slate-300'>
						<div className='duration-600  -inset-0.5 z-0  bg-gradient-to-b from-[#c7d2fe] to-[#f2f0ff] opacity-0 blur transition group-hover:opacity-75' />
						<div className=' w-full h-full relative'>
							{/* <StarsCanvas />
							<EarthCanvas /> */}

							<Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
								<Suspense fallback={null}>
									<Stage controls={ref} preset='rembrandt' intensity={1} environment='city'>
										<Model />
									</Stage>
								</Suspense>
								<OrbitControls ref={ref} />
							</Canvas>
						</div>
					</div>
				</div>
			</div>
			<div className={`ss:hidden ${styles.flexCenter}`}>
				<GetStarted />
			</div>
		</section>
	)
}

export default Hero
