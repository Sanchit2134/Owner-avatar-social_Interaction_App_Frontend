import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SuggestedUser = () => {
    const { suggestedUser } = useSelector(store => store.auth)
    // console.log("Suggested Users:", suggestedUser);
    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-400'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See All</span>
            </div>
            {
                suggestedUser?.map((user)=>{
                    return(
                        <div key={user._id} className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <Link to={`/profile/${user?._id}`}>
                                    <Avatar>
                                        <AvatarImage src={user?.profilePicture} alt='profile_img' className='w-8 h-8 rounded-full'/>
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <h1><Link to={`profile/${user?._id}`}>{user?.username}</Link></h1>
                                    <span>{user?.bio || 'bio here...'}</span>
                                </div>
                            </div>
                            <span className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'>Follow</span>
                        </div>
                    )
                })
            }
        </div>
    );
}    

export default SuggestedUser