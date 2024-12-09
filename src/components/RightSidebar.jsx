import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SuggestedUser from './SuggestedUser';

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth)

  if (!user) {
    return null; // or return a loading spinner or placeholder
  }

  return (
    <div className='w-fit my-10 pr-32'>
      <div className='flex items-center gap-2'>
        <Avatar >
          <AvatarImage className='w-6 h-6 rounded-full' src={user.profilePicture} alt='profile_img' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className='font-semibold text-sm'><Link to={`/profile/${user._id}`}>{user.username}</Link></h1>
          <span className='text-gray-300 text-sm'>{user.bio || 'Bio here...'}</span>
        </div>
      </div>
      <SuggestedUser/>
    </div>
  )
}

export default RightSidebar