import { setMessages } from '@/redux/chatSlice'
import { setPost } from '@/redux/PostSlice'
import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllMessage = () => {
    const dispatch = useDispatch()
    const {selectedUser} = useSelector(store=>store.auth);
    useEffect(()=>{
        const fetchAllMessages = async()=>{
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/post/all/${selectedUser?._id}`, {withCredentials: true});
                if(res.data.success){
                    // console.log(res.data);
                    dispatch(setMessages(res.data.message));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllMessages(); 
    },[selectedUser])
}

export default useGetAllMessage;