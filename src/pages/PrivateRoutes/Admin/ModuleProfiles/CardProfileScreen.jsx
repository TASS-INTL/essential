import React from 'react';

import { icons } from '@/Components/SideBar';
import { NoData } from '@/Components';

export const CardsProfilesScreen = ({ dataList }) => {
  if (!dataList || dataList.length === 0) {
    return <NoData />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
      {dataList.map((item) => (
        <div
          key={item._id}
          className="flex flex-col p-3 bg-gray-100 rounded-md shadow-sm border border-gray-300 hover:shadow-md transition"
        >
          <h2 className="text-sm font-bold text-gray-800 truncate mb-1">{item.name}</h2>
          <p className="text-xs text-gray-600 line-clamp-2 mb-2">
            {item.description || 'Sin descripción'}
          </p>
          <div className="text-xs text-gray-500 space-y-1 mt-auto">
            <p>
              <span className="font-semibold">Creado:</span>{' '}
              {new Date(item.created_at).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Actualizado:</span>{' '}
              {new Date(item.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};