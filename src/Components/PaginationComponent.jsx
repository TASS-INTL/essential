import React, { useState } from 'react'

export const PaginationComponent = ({ pageSelected, dataPagination, setPageSelected, setArray, array }) => {
	let arrayItems =
		dataPagination?.number_pages > 5 ? [1, 2, 3, 4, 5] : new Array(dataPagination?.number_pages).fill(null)

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
				{pageSelected > 5 && (
					<>
						<li>
							<a
								onClick={() => setPageSelected(1)}
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

				{array.map((item, index) => {
					return (
						<li key={index}>
							<a
								href='#'
								onClick={() => {
									setPageSelected(item)
									console.log('item', item)
									console.log('pageSelected', pageSelected)

									if (item >= 5) {
										if (!array.includes(dataPagination?.number_pages - 1)) {
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
				{dataPagination?.number_pages > 5 && (
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
						<li>
							<a
								onClick={() => setPageSelected(dataPagination?.number_pages)}
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
