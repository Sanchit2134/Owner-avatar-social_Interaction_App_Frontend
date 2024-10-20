import { useEffect } from 'react'
import ChatPage from './components/ChatPage'
import EditProfile from './components/EditProfile'
import Home from './components/Home'
import Login from './components/Login'
import Profile from './components/Profile'
import Signup from './components/Signup'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {io} from 'socket.io-client' 
import { useDispatch, useSelector } from 'react-redux'
import { setOnlineUsers } from './redux/chatSlice'
import { setSocket } from './redux/SocketSlice'
import { setLikeNotification } from './redux/RTNSlice'

const App = ()=> {
  const {user} = useSelector(store=>store.auth);
  const {socket} = useSelector(store=>store.socketio);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(user){
      const socketio = io('http://localhost:8000',{
        query:{
          userId: user?._id
        },
        transports:['websocket'] // to avoid unnecessary api calls
      });

      //listen all the events
      socketio.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers));
      })

      socketio.on('notification', (notification)=>{
        dispatch(setLikeNotification(notification));
      })

      return ()=>{
        socketio.close();
        dispatch(setSocket(null));
      }
    }
    else if(socket){
      socket.close();
        dispatch(setSocket(null));
    }
}, [user,dispatch])
  return (
    <>
      <div>
        <Router>
          <Routes>
          <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile/:id' element={<Profile/>}/>
            <Route path='/account/edit' element={<EditProfile/>}/>
            <Route path='/chat' element={<ChatPage/>}/>

          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App