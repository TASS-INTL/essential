export const LiveIndicator = () => {
	return (
		<svg height='50' width='50'>
			<circle cx='25' cy='25' r='10' fill='green' className='pulse' />
			<style jsx='true'>{`
				.pulse {
					animation: pulseAnimation 2s infinite;
				}

				@keyframes pulseAnimation {
					0% {
						fill: green;
					}
					50% {
						fill: red;
					}
					100% {
						fill: green;
					}
				}
			`}</style>
		</svg>
	)
}
