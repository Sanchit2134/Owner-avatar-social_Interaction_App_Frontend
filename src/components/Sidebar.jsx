import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/AuthSlice'
import CreatePost from './CreatePost'
import { setPost, setSelectedPost } from '@/redux/PostSlice'



const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/user/logout', {
        withCredentials: true
      })
      if (res.data.success) {
        dispatch(setAuthUser(null))
        dispatch(setSelectedPost(null))
        dispatch(setPost([]))
        navigate('/login')
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)

    }
  }

  const handleSidebar = (textType) => {
    if (textType === 'Logout') {
      handleLogout()
    }
    else if (textType === 'Create') {
      setOpen(true)
    }
    else if (textType === 'Profile') {
      navigate(`/profile/${user?._id}`)
    }
    else if(textType === 'Home'){
      navigate('/')
    }
  }

  const SidebarItems = [
    { icon: <Home />, text: 'Home' },
    { icon: <Search />, text: 'Search' },
    { icon: <TrendingUp />, text: 'Explore' },
    { icon: <MessageCircle />, text: 'Message' },
    { icon: <Heart />, text: 'Notification' },
    { icon: <PlusSquare />, text: 'Create' },
    {
      icon: (<Avatar className='w-6 h-6 '>
        <AvatarImage src={user?.profilePicture} alt='profile_img' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      ), text: 'Profile'
    },
    { icon: <LogOut />, text: 'Logout' },
  ]

  return (
    <>
      <div className='fixed top-0 left-0 z-10 px-4 border-r bg-gray-300 w-[16%] h-screen'>
        <div className='flex flex-col'>
          <h1 className='my-8 pl-3 font-bold text-xl'>Logo</h1>
          <div>
            {
              SidebarItems.map((item, index) => {
                return (
                  <div onClick={() => handleSidebar(item.text)} key={index} className='flex items-center gap-4 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3'>
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
        <CreatePost open={open} setOpen={setOpen}/>
      </div>
    </>
  )
}

export default Sidebar