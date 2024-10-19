import useGetUserProfile from '@/hooks/useGetUserProfile'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from './ui/button'
import { useSelector } from 'react-redux'
import { Badge, Heart } from 'lucide-react'

const Profile = () => {
  const params = useParams()
  const userId = params.id
  useGetUserProfile(userId)
  const [activeTab, setActiveTab] = useState('posts')

  const { userProfile, user } = useSelector(store => store.auth)
  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isfollowing = false;

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const displayPosts = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks

  return (
    <div className='flex max-w-5xl justify-center mx-auto pl-10'>
      <div className='flex flex-col gap-20 p-8'>
        <div className='grid grid-col-2'>
          <section className='flex items-center justify-center'>
            <Avatar className='h-32 w-32'>
              <AvatarImage src='https://github.com/shadcn.png' alt='profile_img' />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-2'>
                <span>{userProfile?.username}</span>
                {
                  isLoggedInUserProfile ? (
                    <>
                      <Link to='/account/edit'> <Button variant='secondary' className='hover:bg-gray-500 h-8'>Edit Profile</Button></Link>
                      <Button variant='secondary' className='hover:bg-gray-500 h-8'>View Arcgive</Button>
                      <Button variant='secondary' className='hover:bg-gray-500 h-8'>Ad tool</Button>
                    </>
                  ) : (
                    isfollowing ? (
                      <>
                        <Button className='bg-[#0095F6] hover:bg-[#3192d2]'>Unfollow</Button>
                        <Button className='bg-[#0095F6] hover:bg-[#3192d2]'>Message</Button>
                      </>
                    ) : (
                      <Button className='bg-[#0095F6] hover:bg-[#3192d2] h-8'>Follow</Button>
                    )
                  )
                }
              </div>
            </div>
            <div className='flex items-center justify-center gap-4'>
              <p><span className='font-semibold'>{userProfile?.posts.length}</span>posts</p>
              <p><span className='font-semibold'>{userProfile?.followers.length}</span>followers</p>
              <p><span className='font-semibold'>{userProfile?.followings.length}</span>followings</p>
            </div>
            <div className='flex flex-col gap-1 '>
              <span className='font-semibold'>{userProfile?.bio || 'bio here...'}</span>
              <Badge className='w-fit' variant='secondary'>{userProfile?.username}</Badge>
            </div>
          </section>
        </div>
        <div className='border-t border-t-gray-400'>
          <div className='flex items-center justify-center gap-10 text-sm'>
            <span className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`} onClick={() => handleTabChange('post')}>Posts</span>
            <span className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`} onClick={() => handleTabChange('saved')}>Saved</span>
            <span className='py-3 cursor-pointer'>Reels</span>
            <span className='py-3 cursor-pointer'>Tags</span>
          </div>
          <div>
            {
              displayPosts?.map((post) => {
                return (
                  <div className='relative cursor-pointer'>
                    <img src={post.image} alt="postImage" className='rounded-sm my-2 w-full aspect-square object-cover' />
                    <div className='rounded flex items-center justify-center bg-black bg-opacity-50'>
                      <div>
                        <Button>
                          <Heart />
                          <span>{post?.likes.length}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile