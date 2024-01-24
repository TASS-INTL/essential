import React from 'react'

import styles from '../../styles'
import { Billing, Business, CardDeal, Clients, CTA, Footer, Hero, Navbar, Stats, Testimonials } from './components'

export const Landing = () => {
	return (
		<div className=' bg-primary w-full overflow-hidden'>
			<div className={`${styles.paddingX} ${styles.flexCenter}`}>
				<div className={`${styles.boxWidth}`}>
					<Navbar />
				</div>
			</div>

			<div className={`bg-pramary ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<Hero />
				</div>
			</div>
			<div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
				<div className={`${styles.boxWidth}`}>
					<Stats />
					<Business />
					<Billing />
					<CardDeal />
					<Testimonials />
					<Clients />
					<CTA />
					<Footer />
				</div>
			</div>
		</div>
	)
}
