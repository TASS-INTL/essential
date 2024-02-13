import { useCallback, useRef, useState } from 'react'

import { candado, discount, robot } from '../../../assets/assetsLandin'
import styles from '../../../styles'
import GetStarted from './GetStarted'

const Hero = () => {
	const [rotate, setRotate] = useState({ x: 0, y: 0 })
	const divRef = useRef()
	const [isFocused, setIsFocused] = useState(false)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [opacity, setOpacity] = useState(0)

	function throttle(func, delay) {
		let lastCall = 0
		return (...args) => {
			const now = new Date().getTime()
			if (now - lastCall < delay) {
				return
			}
			lastCall = now
			return func(...args)
		}
	}

	const onMouseMove = useCallback(
		throttle((e) => {
			const card = e.currentTarget
			const box = card.getBoundingClientRect()
			const x = e.clientX - box.left
			const y = e.clientY - box.top
			const centerX = box.width / 2
			const centerY = box.height / 2
			const rotateX = (y - centerY) / 4
			const rotateY = (centerX - x) / 4

			setRotate({ x: rotateX, y: rotateY })
		}, 100),
		[]
	)

	const onMouseLeave = () => {
		setRotate({ x: 0, y: 0 })
	}

	const handleMouseMove = (e) => {
		if (!divRef.current || isFocused) return

		const div = divRef.current
		const rect = div.getBoundingClientRect()

		setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
	}

	const handleFocus = () => {
		setIsFocused(true)
		setOpacity(1)
	}

	const handleBlur = () => {
		setIsFocused(false)
		setOpacity(0)
	}

	const handleMouseEnter = () => {
		setOpacity(1)
	}

	const handleMouseLeave = () => {
		setOpacity(0)
	}

	return (
		<section
			ref={divRef}
			onMouseMove={handleMouseMove}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			id='home'
			className={`flex md:flex-row flex-col ${styles.paddingY}`}
		>
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

			<div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative `}>
				<div className='card relative w-[90%] h-[90%] ' onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
					<div className='group relative flex h-full w-full select-none items-center justify-center   ç  text-sm font-light text-slate-300'>
						<div className='duration-600 absolute -inset-0.5 -z-10  bg-gradient-to-b from-[#c7d2fe] to-[#f2f0ff] opacity-0 blur transition group-hover:opacity-75' />
						<span className='text-md bg-gradient-to-t from-neutral-400 to-white bg-clip-text font-bold text-transparent'>
							<img
								src={candado}
								alt='billing'
								className='w-[100%] h-[100%] relative z-[5] rounded-xl  transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform'
								style={{
									transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
									transition: 'all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s'
								}}
							/>
						</span>
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
