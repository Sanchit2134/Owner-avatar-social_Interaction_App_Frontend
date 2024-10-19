import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Dialog, DialogContent } from '@radix-ui/react-dialog'
import React, { useRef, useState } from 'react'
import { DialogHeader } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { readFileAsDataURL } from '@/lib/utils'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from '@/redux/PostSlice'

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef()
  const [file, setFile] = useState('');
  const [caption, setCaption] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(store => store.auth);

  const dispatch = useDispatch();

  const fileChangeHandler = async(e)=>{
    const file = e.target.files?.[0];
    if(file){
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
      // console.log(dataUrl);
    }
  }

  const createpostHandler = async (e) => {
    e.preventDefault();
    const formatData = new FormData();  
    formatData.append('caption', caption);  
    if(imagePreview) formatData.append('image', file);
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/post/addpost', formatData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      console.log(res); //debugging
      if(res.data.success){
        // console.log(res.data.message); //debugging
        dispatch(setPost([res.data.post, ...post]));  
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <>
      <Dialog open={open}>
        <DialogContent onInteractOutside={() => setOpen(false)}>
          <DialogHeader>Create New Post</DialogHeader>
          <div className='flex gap-3 items-center' onSubmit={createpostHandler}>
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt='img' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className='font-semibold text-xs'>{user?.username}</h1>
              <span className='text-gray-400 text-xs'>Bio here...</span>
            </div>
          </div>
          <Textarea value={caption} onChange={(e)=> setCaption(e.target.value)} className='focus-visible: ring-transparent border-none' placeholder='write a caption...'/>
          {
            imagePreview && (
              <div>
                <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md'/>
              </div>
            )
          }
          <input ref= {imageRef} type="file" className='hidden' onChange={fileChangeHandler}/>
          <Button onClick={()=>imageRef.current.click()} className='w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf]'>Select from device</Button>
          {
            imagePreview && (
              loading ? (
                <Button>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                  Please wait...
                </Button>
              ) :(
                <Button onClick={createpostHandler} type='submit' className='w-full'>Post</Button>
              )
            )
          }
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreatePost

