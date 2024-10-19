import { setSelectedUser } from '@/redux/AuthSlice'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from './ui/input'
import { MessageCircleCode } from 'lucide-react'
import Message from './Message'

const ChatPage = () => {
  const { user, suggestedUser, selectedUser } = useSelector(store => store.auth)
  const isOnline = true;
  const dispatch = useDispatch();

  return (
    <div className='flex ml-[16%] h-screen'>
      <section className='w-full md:w-1/4 my-8'>
        <h1 className='font-bold mb-4 px-3 text-xl'>{user?.username}</h1>
        <hr className='mb-4 border-gray-300' />
        <div className='overflow-y-auto h-[80vh]'>
          {
            suggestedUser?.map((suggestedUser) => {
              return (
                <div onClick={() => dispatch(setSelectedUser(suggestedUser))} className='flex gap-3 items-center p-3 hover:bg-gray-300 cursor-pointer'>
                  <Avatar>
                    <AvatarImage src={suggestedUser?.profilePicture}></AvatarImage>
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col'>
                    <span className='font-medium'>{suggestedUser?.username}</span>
                    <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'} `}>{isOnline ? 'online' : 'offline'}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
      {
        selectedUser ? (
          <section className='flex-1 border-l border-l-gray-300 flex flex-col h-full'>
            <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10'>
              <Avatar>
                <AvatarImage src={selectedUser?.profilePicture}></AvatarImage>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span>{selectedUser?.username}</span>
              </div>
            </div>
            <Message selectedUser={selectedUser}/>
            <div className='flex items-center p-4 border-t border-t-gray-100'>
              <Input type='text' className='flex-1 mr-2 focus-visible:ring-transparent' placeholder='Messages...' />
              <Button>Send</Button>
            </div>
          </section>
        ) : (
          <div className='flex flex-col items-center justify-center mx-auto'>
            <MessageCircleCode className='w-32 h-32 my-4' />
            <h1 className='font-medium text-xl'>Your message</h1>
            <span>Send a message to start chat</span>
          </div>
        )
      }
    </div>
  )
}

export default ChatPage