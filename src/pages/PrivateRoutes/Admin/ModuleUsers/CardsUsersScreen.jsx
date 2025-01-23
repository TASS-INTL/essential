import React from 'react'
import { icons } from '@/Components/SideBar'
import { NoData } from '@/Components';



export const CardsUsersScreen = ({ dataList }) => {
  if (!dataList || dataList.length === 0) {
    return <NoData />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
      {dataList.map((item) => (
        <div
          key={item._id}
          className="flex flex-col p-4 bg-white rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition"
        >
          <div className="flex items-center mb-3">
            <img
              src={icons['User']}
              alt="icon user"
              className="w-10 h-10 mr-3 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{item.username}</h2>
              <p className="text-sm text-gray-600">{item.email}</p>
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-3">
            <p><span className="font-semibold">Estado:</span> {item.status}</p>
            <p><span className="font-semibold">Documento:</span> {item.number_document_personal}</p>
          </div>
          <div className="mt-auto text-xs text-gray-500">
            <p>Creado: {new Date(item.created_at).toLocaleDateString()}</p>
            <p>Actualizado: {new Date(item.updated_at).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}