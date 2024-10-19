import { setPost } from '@/redux/PostSlice'
import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllPost = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchAllPost = async()=>{
            try {
                const res = await axios.get('http://localhost:8000/api/v1/post/allpost', {withCredentials: true});
                if(res.data.success){
                    // console.log(res.data);
                    dispatch(setPost(res.data.post));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPost(); 
    },[])
}

export default useGetAllPost