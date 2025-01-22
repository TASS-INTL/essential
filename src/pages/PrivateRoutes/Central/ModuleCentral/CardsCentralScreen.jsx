import React from 'react'

import { icons } from '@/Components/SideBar'
import { NoData } from '@/Components'

export const CardsCentralScreen = ({ dataList }) => {
  if (!dataList || dataList.length === 0) {
    return <NoData />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
      {dataList.map((item) => (
        <div
          key={item._id}
          className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition"
        >
          <div className="flex items-center mb-3">
            <img
              src={icons['Centers']}
              alt="icon module"
              className="w-10 h-10 mr-3"
            />
            <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
          </div>
          <h3 className="text-md font-semibold text-gray-700 mb-1">Descripción</h3>
          <p className="text-sm text-gray-600 mb-3">
            {item.description || 'Sin descripción'}
          </p>
          <div className="mt-auto text-right text-xs text-gray-500">
            <p>Creado: {new Date(item.created_at).toLocaleDateString()}</p>
            <p>Actualizado: {new Date(item.updated_at).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}