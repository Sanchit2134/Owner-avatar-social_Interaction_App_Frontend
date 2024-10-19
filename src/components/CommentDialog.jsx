import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog'
import { MoreHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment'
import axios from 'axios'
import { toast } from 'react-toastify'
import { setPost } from '@/redux/PostSlice'

const CommentDialog = ({ open, setOpen }) => {
    const [text, setText] = useState('')
    const {selectedPost,posts} = useSelector(store => store.post)
    const [comment, setComment] = useState(selectedPost?.comments || []);
    const dispatch = useDispatch()

    useEffect(()=>{
        if(selectedPost){
            setComment(selectedPost?.comments)
        }
    },[selectedPost])

    const changeEventHandler = (e) => {
        const inputText = e.target.value
        if (inputText.trim()) {
            setText(inputText)
        }
        else {
            setText('')
        }
    }

    const sendMessageHandler = async () => {
        try {
          const res = await axios.post(`http://localhost:8000/api/v1/post/${selectedPost?._id}/comment`, { text },
            {
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true
            });
            console.log(res.data);
          if (res.data.success) {
            const updatedCommentData = [...comment, res.data.comment];
            setComment(updatedCommentData);
    
            const updatedPostData = posts.map(p =>
              p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
            );
            dispatch(setPost(updatedPostData));
            toast.success(res.data.message);
            setText("")
          }
          dispatch(setPost(updatedPostData));
        } catch (error) {
          console.log(error);
    
        }
      }
    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} className='max-w-5xl p-0 flex flex-col'>
                <div className='flex flex-1'>
                    <div className='w-1/2'>
                        <img src={selectedPost?.image}
                            alt="post_img"
                            className='w-full h-full object-cover rounded-l-lg' />
                    </div>
                    <div className='w-1/2 flex flex-col justify-center'>
                        <div className='flex items-center justify-center p-4'>
                            <div className='flex gap-3 items-center'>
                                <Link>
                                    <Avatar>
                                        <AvatarImage src={selectedPost?.author?.profilePicture} alt='post_image'/>
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <Link className='font-semibold text-sm'>{selectedPost?.author?.username}</Link>
                                </div>
                            </div>
                            <Dialog className='aspect-square'>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className='cursor-pointer w-full'/>
                                </DialogTrigger>
                                <DialogContent>
                                    <div className='cursor-pointer w-full text-[#ED4956] font-semibold'>
                                        Unfollow
                                    </div>
                                    <div className='cursor-pointer w-full'>    
                                        Add to favorites
                                    </div>                         
                                </DialogContent>
                            </Dialog>
                        </div>
                        <hr/>
                        <div className='flex-1 overflow-y-auto max-h-96'>
                            {
                                comment.map((comment)=> <Comment key={comment._id} comment={comment}/>)
                            }
                        </div> 
                        <div className='p-4'>
                            <div className='flex'>
                                <input type="text" value={text} onChange={changeEventHandler} placeholder='Add a comment...' className='w-full outline-none border border-gray-300 p-2' />
                                <Button disabled={!text.trim()} onClick={sendMessageHandler} variant='outline'>Send</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default CommentDialog