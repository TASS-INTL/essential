import React, { useState } from 'react'

export const PaginationComponent = ({ pageSelected, dataPagination, setPageSelected }) => {
	const [array, setArray] = useState([1, 2, 3, 4, 5])

	const fillArrayWithLastValue = (UltimoValor) => {
		let array = []
		for (let i = UltimoValor - 4; i <= UltimoValor; i++) {
			array.push(i)
		}
		return array
	}

	return (
		<nav aria-label='Page navigation example'>
			<ul className='inline-flex -space-x-px text-sm'>
				<li>
					<a
						onClick={() => {}}
						href='#'
						className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 '
					>
						Previous
					</a>
				</li>
				{pageSelected >= 5 && (
					<>
						<li>
							<a
								onClick={() => {
									setArray(fillArrayWithLastValue(5))
									setPageSelected(1)
								}}
								href='#'
								className={` flex items-center justify-center px-3 h-8 border-gray-300 ${
									pageSelected === 1
										? 'text-blue-600 border  bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
										: 'ms-0 leading-tight text-gray-500 bg-white border border-e-0  rounded-s-lg hover:bg-gray-100 hover:text-gray-700'
								} `}
							>
								1
							</a>
						</li>
						<li>
							<a className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 '>
								...
							</a>
						</li>
					</>
				)}
				{array.map((item, index) => {
					return (
						<li key={index}>
							<a
								href='#'
								onClick={() => {
									setPageSelected(item)
									if (item >= 5) {
										if (!array.includes(dataPagination?.number_pages)) {
											setArray(array.map((elemento) => elemento + 1))
										}
									}
									if (pageSelected > item) {
										if (!array.includes(1)) {
											setArray(array.map((elemento) => elemento - 1))
										}
									}
								}}
								className={` flex items-center justify-center px-3 h-8 border-gray-300 ${
									pageSelected === item
										? 'text-blue-600 border  bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
										: 'ms-0 leading-tight text-gray-500 bg-white border border-e-0  rounded-s-lg hover:bg-gray-100 hover:text-gray-700'
								} `}
							>
								{item}
							</a>
						</li>
					)
				})}
				{dataPagination?.number_pages > 5 && !array.includes(dataPagination?.number_pages) && (
					<>
						{!array.includes(dataPagination?.number_pages - 1) && (
							<>
								<li>
									<a
										onClick={() => {}}
										href='#'
										className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 '
									>
										...
									</a>
								</li>
							</>
						)}

						<li>
							<a
								onClick={() => {
									setArray(fillArrayWithLastValue(dataPagination?.number_pages))
									setPageSelected(dataPagination?.number_pages)
								}}
								href='#'
								className={` flex items-center justify-center px-3 h-8 border-gray-300 ${
									pageSelected === dataPagination?.number_pages
										? 'text-blue-600 border  bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
										: 'ms-0 leading-tight text-gray-500 bg-white border border-e-0  rounded-s-lg hover:bg-gray-100 hover:text-gray-700'
								} `}
							>
								{dataPagination?.number_pages}
							</a>
						</li>
					</>
				)}
				<li>
					<a
						onClick={() => {}}
						href='#'
						className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 '
					>
						Next
					</a>
				</li>
			</ul>
		</nav>
	)
}
