import { setPost } from '@/redux/PostSlice'
import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllPost = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchAllPost = async()=>{
            try {
                const token = localStorage.getItem('token');
                // const res = await axios.get('http://localhost:8000/api/v1/post/all', {withCredentials: true});
                const res = await axios.get('http://localhost:8000/api/v1/post/all', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                if(res.data.success){
                    // console.log(res.data);
                    dispatch(setPost(res.data.posts));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPost(); 
    },[])
}

export default useGetAllPost