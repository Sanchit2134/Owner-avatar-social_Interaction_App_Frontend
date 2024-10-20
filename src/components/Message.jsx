import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import useGetAllMessage from '@/hooks/useGetAllMessage'
import { useSelector } from 'react-redux'
import  useGetRTM  from '@/hooks/useGetRTM'

const Message = ({selectedUser}) => {
    useGetRTM();
    const {messages} = useSelector(store=>store.chat);
    const {user} = useSelector(store=>store.auth);
    useGetAllMessage();
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
                messages.map((msg)=>{
                    return (
                        <div className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-2 rounded-lg max-w-xs ${msg.senderId === user?._id ? 'bg-blue-500 text-white' : 'bg-gray-400 text-black'}`}>
                                {msg.messages}
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