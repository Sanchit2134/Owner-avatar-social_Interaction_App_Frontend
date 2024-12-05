import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'

const Signup = () => {
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    // console.log(input) 
    try {
      const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate('/')
        toast.success(res.data.message)
        setInput({
          username: '',
          email: '',
          password: ''
        })
      }
      console.log(res);
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }finally{
      setLoading(false)}
    
  }
  return (
    <div className='flex items-center w-screen h-screen justify-center'>
      <form onSubmit={submitHandler} className='shadow-lg flex flex-col gap-5 p-8'>
        <div className='my-4'>
          <h1 className='my-4 flex justify-center font-bold'>LOGO</h1>
          <p>Sign Up to see photo & video from your friend</p>
        </div>
        <div>
          <label htmlFor="username" className='font-medium'>Username</label> <br />
          <Input
            type="text"
            name='username'
            value={input.username}
            onChange={changeEventHandler}
            className='focus-visible: ring-transparent my-2'
          />
        </div>
        <div>
          <label htmlFor="Email" className='font-medium'>Email</label> <br />
          <Input 
            type="email"
            name='email'
            value={input.email}
            onChange={changeEventHandler}
            className='focus-visible: ring-transparent my-2'
          />
        </div>
        <div>
          <label htmlFor="password" className='font-medium'>Password</label> <br />
          <Input 
            type="password"
            name='password'
            value={input.password}
            onChange={changeEventHandler}
            className='focus-visible: ring-transparent my-2'
          />
        </div>
        {
          loading ? (<Button><Loader2 className='mr-2 h-4 w-4' /></Button>) : (<Button type='submit'>Sign Up</Button>)
        }

        <span className='text-center'>Already have an account? <Link to='/login' className='text-blue-600'>Login</Link> </span>
      </form>
    </div>
  )
}

export default Signup