import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useSelector } from 'react-redux'
import useGetRTM from '@/hooks/useGetRTM'
import useGetAllMessage from '@/hooks/useGetAllMessage'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'

const Message = ({ selectedUser }) => {
    const { messages } = useSelector(store => store.chat);
    const { user } = useSelector(store => store.auth);
    useGetAllMessage();
    useGetRTM();
    return (
        <div className='overflow-y-auto flex-1 p-4'>
            <div className='flex justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <Avatar >
                        <AvatarImage src={selectedUser?.profilePicture} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{selectedUser?.username}</span>
                    <Link to={`/profile/${selectedUser?._id}`}><Button className='h-8 my-2'> View profile</Button></Link>
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                {
                    messages && messages.map((msg) => {
                        return (
                            <div className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-2 rounded-lg max-w-xs ${msg.senderId === user?._id ? 'bg-blue-500 text-white' : 'bg-gray-400 text-black'}`}>
                                    {msg.messages}
                                </div>
                                {/* {
                                    msg.senderId === user?._id && (
                                        <Popover>
                                        <PopoverTrigger asChild>
                                          <Button size='icon' className='rounded-full h-5 w-5 bg-red-500 hover:bg-red-500 absolute bottom-6 left-6'>{likeNotification.length}</Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                          <div>
                                            {
                                              likeNotification.length === 0 ? (<p>No new notification</p>) : (
                                                likeNotification.map((notification) => {
                                                  return (
                                                    <div key={notification.userId} className='flex items-center gap-2 my-2 '>
                                                      <Avatar>
                                                        <AvatarImage src={notification.userDetail?.profilePicture} />
                                                        <AvatarFallback>CN</AvatarFallback>
                                                      </Avatar>
                                                      <p className='text-sm'><span className='font-bold'>{notification.userDetail?.username} liked your post</span></p>
                                                    </div>
                                                  )
                                                })
                                              )
                                            }
                                          </div>
                                        </PopoverContent>
                                      </Popover>
                                    )
                                } */}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Message