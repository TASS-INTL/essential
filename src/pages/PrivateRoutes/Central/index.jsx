import React from 'react'
import { Container } from '@/Components/Container'
import { icons } from '@/Components/SideBar'
import { userStore } from '@/store/userStore'
import { NavLink } from 'react-router-dom'

export const CentralScreen = ({ NameMap, title }) => {
  const { modules } = userStore((state) => state.userData)
  const { submodules } = modules.find((item) => item.name === NameMap)

  return (
    <Container>
      <h1 className="text-center text-5xl font-bold mt-2 mb-11 text-gray-700">
        {title}
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-6 px-4">
        {submodules.map((item) => (
          <NavLink
            key={item.name}
            to={item.pathName}
            className="group relative w-52 h-52 
                       bg-gradient-to-r from-gray-600 to-gray-700
                       rounded-xl shadow-md flex flex-col items-center justify-center 
                       transform transition duration-300 hover:-translate-y-1 hover:shadow-xl
                       filter brightness-95 saturate-75"
          >
            <img
              src={icons[item.src]}
              alt="icon module"
              className="w-16 h-16 mb-3"
            />
            <span className="text-white text-2xl font-semibold group-hover:text-gray-200 px-4 text-center">
              {item.name_consult}
            </span>
            <div className="absolute inset-0 bg-black bg-opacity-0 rounded-xl transition duration-300 group-hover:bg-opacity-10" />
          </NavLink>
        ))}
      </div>
    </Container>
  )
}
