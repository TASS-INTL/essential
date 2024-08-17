/** @type {import('tailwindcss').Config} */

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				'caret-blink': {
					'0%,70%,100%': { opacity: '1' },
					'20%,50%': { opacity: '0' }
				}
			},
			animation: {
				'caret-blink': 'caret-blink 1.2s ease-out infinite'
			},
			display: ['Inter', 'system-ui', 'sans-serif'],
			body: ['Inter', 'system-ui', 'sans-serif'],
			colors: {
				primary: '#262626',
				secondary: '#3366ff',
				bluePrimary: '#0c3471',
				lightWhite: 'rgba(255, 255, 255, 0.17)'
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif']
			}
		},
		screens: {
			xs: '480px',
			ss: '620px',
			sm: '768px',
			md: '1060px',
			lg: '1200px',
			xl: '1700px'
		}
	},
	plugins: []
}
