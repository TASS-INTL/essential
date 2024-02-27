import React, { Suspense } from 'react'

import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import CanvasLoader from './CanvasLoader'

const Earth = () => {
	const earth = useGLTF('./planet/scene.gltf')

	return <primitive object={earth.scene} scale={0.4} position-y={0} rotation-y={2} />
}

export const EarthCanvas = () => {
	return (
		<div className=' w-full h-full absolute z-10 top-0'>
			<Canvas
				shadows
				frameloop='demand'
				dpr={[1, 2]}
				gl={{ preserveDrawingBuffer: true }}
				camera={{
					fov: 45,
					near: 2,
					far: 100,
					position: [2, 1, 10]
				}}
			>
				<Suspense fallback={<CanvasLoader />}>
					<ambientLight intensity={10} />
					<directionalLight translateX={1} />
					<OrbitControls autoRotate />
					<Earth />
					<Preload all />
				</Suspense>
			</Canvas>
		</div>
	)
}
