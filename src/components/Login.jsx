import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '@/redux/AuthSlice' 
import { Input } from './ui/input'

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
        setInput({
          email: '',
          password: '',
        });
      }
    } catch (error) {
      // Improved error handling
      if (error.response && error.response.data) {
        // If the response contains data, show the error message
        toast.error(error.response.data.message);
      } else {
        // For network errors or any undefined responses, show a generic error message
        toast.error("Something went wrong. Please try again later.");
        console.error("Error:", error);  // You can log the full error object for debugging
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className='flex items-center w-screen h-screen justify-center'>
      <form onSubmit={submitHandler} className='shadow-lg flex flex-col gap-5 p-8'>
        <div className='my-4'>
          <h1 className='my-4 flex justify-center font-bold'>LOGO</h1>
          <p>Login to see photo & video from your friend</p>
        </div>
        <div>
          <label htmlFor="Email" className='font-medium'>Email</label> <br />
          <Input type="email"
            name='email'
            value={input.email}
            onChange={changeEventHandler}
            className='focus-visible: ring-transparent my-2'
          />
        </div>
        <div>
          <label htmlFor="password" className='font-medium'>Password</label> <br />
          <Input type="password"
            name='password'
            value={input.password}
            onChange={changeEventHandler}
            className='focus-visible: ring-transparent my-2'
          />
        </div>
        {
          loading ? (<Button>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait
          </Button>)
            :
            (<Button type='submit'>Login</Button>)
        }
        <span className='text-center'>Doesn't have an account? <Link to='/signup' className='text-blue-600'>Sign up</Link> </span>
      </form>
    </div>
  )
}

export default Login