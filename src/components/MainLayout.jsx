import React from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUser from '@/hooks/useGetSuggestedUser'

const MainLayout = () => {
  useGetAllPost()
  useGetSuggestedUser()
  return (
    <div>
      <Sidebar />
      <div className='flex'>
        <div className='flex-grow'>
          <Feed />
          <Outlet />
        </div>
        <RightSidebar />
      </div>
    </div>
  )
}

export default MainLayout