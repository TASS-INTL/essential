import React from 'react';
import { FaClock, FaMapMarkerAlt, FaCar, FaBell, FaChartLine } from 'react-icons/fa';



const CardsTravelsDetailsScreen = ({ travels }) => {
  const getProgressColor = (progress) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-500',
      completed: 'bg-blue-500',
      pending: 'bg-yellow-500',
      cancelled: 'bg-red-500'
    };
    return colors[status.toLowerCase()] || 'bg-gray-500';
  };

  const handleClick = (travel) => {
    console.log('Card clicked:', travel);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {travels.map((travel) => (
        <div
          key={travel._id}
          onClick={() => handleClick(travel)}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">ID: {travel._id}</h3>
              <p className="text-sm text-gray-600">DID: {travel.did}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(travel.status)}`}>
              {travel.status}
            </span>
          </div>

          {/* Progress Sections */}
          <div className="flex justify-between items-center mb-6">
            {/* Distance Progress */}
            <div className="w-1/2 pr-2">
              <div className="relative pt-1">
                <div className="text-sm text-gray-600 mb-1">Distance Progress</div>
                <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
                  <div
                    className={`${getProgressColor(travel.distance.progress)} transition-all duration-500`}
                    style={{ width: `${travel.distance.progress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600">{travel.distance.progress}%</div>
              </div>
            </div>

            {/* Time Progress Circle */}
            <div className="w-1/2 flex justify-end">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={travel.travel_time.progress < 30 ? '#EF4444' : travel.travel_time.progress < 70 ? '#F59E0B' : '#10B981'}
                    strokeWidth="3"
                    strokeDasharray={`${travel.travel_time.progress}, 100`}
                  />
                  <text x="18" y="20.35" className="text-xs font-semibold" textAnchor="middle">
                    {travel.travel_time.progress}%
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-center text-gray-700">
              <FaCar className="mr-2" />
              <span className="text-sm">Service: {travel.service}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaBell className="mr-2" />
              <span className="text-sm">Events: {travel.events}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaChartLine className="mr-2" />
              <span className="text-sm">Monitoring: {travel.Monitoring}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaMapMarkerAlt className="mr-2" />
              <span className="text-sm">
                Location: {travel.location.lat.toFixed(4)}, {travel.location.lng.toFixed(4)}
              </span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaClock className="mr-2" />
              <span className="text-sm">
                Created: {new Date(travel.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsTravelsDetailsScreen;