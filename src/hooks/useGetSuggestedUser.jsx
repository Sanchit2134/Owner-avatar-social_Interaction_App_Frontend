    import { useEffect, useState } from 'react';
    import { useDispatch } from 'react-redux';
    import axios from 'axios';
    import { setSuggestedUser } from '@/redux/AuthSlice';

    const useGetSuggestedUser = () => {
        const dispatch = useDispatch();
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        const fetchSuggestedUsers = async () => {
        try {
            const token = localStorage.getItem('token'); // Adjust according to how you store your token
            const response = await axios.get('http://localhost:8000/api/v1/user/suggested', {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the Authorization header
                },
            });
            dispatch(setSuggestedUser(response.data)); 
        } catch (error) {
            console.error('Error fetching suggested users:', error.response?.data || error.message);
        }
    };
    

        useEffect(() => {
            fetchSuggestedUsers();
        }, []); // No need for dispatch in dependency array

        return { loading, error }; // Return loading and error states
    };

    export default useGetSuggestedUser;
