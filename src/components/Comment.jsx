import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import React from 'react'
import { AvatarImage } from './ui/avatar'

const Comment = ({ comment }) => {
    return (
        <div className='my-2'>
            <div>
                <Avatar>
                    <AvatarImage src={comment?.author?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className='font-bold text-sm'>{comment?.author?.username}<span className='font-normal'>{comment?.text}</span></h1>
            </div>
        </div>
    )
}

export default Comment