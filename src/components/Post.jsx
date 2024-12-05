import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog'
import { MoreHorizontalIcon } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { useState } from 'react'
import CommentDialog from './CommentDialog';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setPost, setSelectedPost } from '@/redux/PostSlice';
import { Badge } from './ui/badge';
import photo from '../assets/photo.jpg';
//useSelector hook is use to get the data from the store
//useDispatch hook is use to dispatch the action(means it tells the store to update its state based on some event or user interaction.) to the store

const Post = ({ post }) => {
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post.likes.length);  
  const [comment, setComment] = useState(post.comments);
  const { user } = useSelector(store => store.auth);
  const { posts } = useSelector(store => store.post);
  const dispatch = useDispatch();

  //Change event handler
  const changeEventHandler = (e) => {
    const inputText = e.target.value
    if (inputText.trim()) {
      setText(inputText)
    }
    else {
      setText('')
    }
  }

  //Logic of like or dislike post
  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? 'dislike' : 'like';
      const res = await axios.get(`http://localhost:8000/api/v1/post/${post._id}/${action}`, { withCredentials: true });
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);
        toast.success(res.data.message);

        //Update the post likes
        const updatedPostData = posts.map(p => p._id === post._id ? {
          ...p,
          likes: liked ? p.likes.filter(id => id !== user?._id) : [...p.likes, user?._id]
        } : p
        )
        dispatch(setPost(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

    }
  }

  // comment handler
  const commentHandler = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/post/${post._id}/comment`, { text }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      // console.log(res);
      if (res.data.success) {
      const updatedCommentData = [...comment, res.data.comment];
      setComment(updatedCommentData);
  
      const updatedPostData = posts.map((p) =>
      p._id === post._id ? { ...p, comments: updatedCommentData } : p
      );
  
      dispatch(setPost(updatedPostData)); // Call dispatch only once here
      toast.success(res.data.message);
      setText(""); // Reset comment text
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  //Logic of deleting  post   
  const deletePostHnadler = async () => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/post/delete/${post?._id}`, { withCredentials: true });
      if (res.data.success) {
        const updatedPost = posts.filter((postItem) => postItem?._id !== post?._id);
        dispatch(setPost(updatedPost));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  } 

  //bookmark handler
  const bookMarkHandler = async () =>{
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/post/${post?._id}/bookmark`, {withCredentials:true});
      if(res.data.success){
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div className='my-8 w-full max-w-sm mx-auto'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Avatar >
              <AvatarImage className='w-6 h-6 rounded-full' src={photo} alt='profile_img' />
              <AvatarFallback>CN</AvatarFallback> 
            </Avatar>
            <div className='flex items-center gap-3'>
            <h1>{post.author?.username}</h1>
            {user._id === post.author._id && <Badge variant='secondary'>Author</Badge>}
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <MoreHorizontalIcon className='cursor-pointer' />
            </DialogTrigger>
            <DialogContent className='flex flex-col items-center text-sm text-center'>
              {
                post?.author?._id !== user?._id && <Button variant='ghost' className='cursor-pointer w-fit text-[#ED4956] font-bold'>Unfollow</Button>
              }
              
              <Button variant='ghost' className='cursor-pointer w-fit'>Add to favorites</Button>
              {user && user?._id === post?.author?._id && <Button onClick={deletePostHnadler} variant='ghost' className='cursor-pointer w-fit'>Delete</Button>}
            </DialogContent>
          </Dialog>
        </div>
        <img
          className='rounded-sm my-2 w-full aspect-square object-cover'
          src={post.image}
          alt="post_img" />
          <div className='flex items-center justify-between my-2'>
            <div className='flex items-center gap-3'>
              {
                liked ? <FaHeart onClick={likeOrDislikeHandler} size={'22'} className='text-red-600 cursor-pointer' /> : <FaRegHeart onClick={likeOrDislikeHandler} className='cursor-pointer text-gray-500 hover:text-gray-600' />
              }
              <FiMessageCircle onClick={() => {
                dispatch(setSelectedPost(post))
                setOpen(true)
              }}
                className='cursor-pointer hover:text-gray-600' />
              <IoIosSend className='cursor-pointer hover:text-gray-600' />
            </div>
            <CiBookmark onClick={bookMarkHandler} className='cursor-pointer hover:text-gray-600' />
          </div>
        <span className='font-medium block mb-2'>{postLike} likes</span>
        <p>
          <span className='font-medium mr-2'>{post.author?.username}</span>
          {post.caption}
        </p>
        {
          comment.length > 0 && (<span className='cursor-pointer text-sm text-gray-400' onClick={() => {
            dispatch(setSelectedPost(post))
            setOpen(true)
          }}>View all {comment.length} comments</span>) 
        }
        <CommentDialog open={open} setOpen={setOpen} />
        <div className='flex items-center justify-between'>
          <input
            type="text"
            placeholder='Add a comment...'
            value={text}
            onChange={changeEventHandler}
            className='outline-none text-sm w-full'
          />
          {
            text && <span onClick={commentHandler} className='text-[#3BADF8] cursor-pointer'>Post</span>
          }
        </div>
      </div>
    </>
  )
}

export default Post
