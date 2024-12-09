import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setSuggestedUser } from '@/redux/AuthSlice';

const useGetSuggestedUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                const token = localStorage.getItem('token'); // Adjust according to how you store your token
                const response = await axios.get('http://localhost:8000/api/v1/user/suggested', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the Authorization header
                    },
                });
                dispatch(setSuggestedUser(response.data.users)); // Dispatch the suggested users
            } catch (error) {
                console.error('Error fetching suggested users:', error.response?.data || error.message);
            }
        };

        fetchSuggestedUsers();
    }, [dispatch]);
};

export default useGetSuggestedUser;