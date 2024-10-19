import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Message = ({selectedUser}) => {
  return (
    <div className='overflow-y-auto flex-1 p-4'>
        <div className='flex justify-center'>
            <div className='flex flex-col items-center justify-center'>
            <Avatar >
                <AvatarImage src={selectedUser?.profilePicture} />
                <AvatarFallback><CN></CN></AvatarFallback>
            </Avatar>
            <span>{selectedUser?.username}</span>
            <Link to={`/profile/${selectedUser?._id}`}><Button className='h-8 my-2'> View profile</Button></Link>
            </div>
        </div>
        <div className='flex flex-col gap-3'>
            {
                [1,2,3,4].map((message)=>{
                    return (
                        <div className={`flex`}>
                            <div>
                                ms
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Message