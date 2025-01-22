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
import ProtectedRoute from './components/ProtectedRoute'

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
      //notification event
      socketio.on('notification', (notification)=>{
        dispatch(setLikeNotification(notification));
      })
      //clean up
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
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path='/signup' element={<ProtectedRoute><Signup/></ProtectedRoute>}/>
            <Route path='/login' element={<ProtectedRoute><Login/></ProtectedRoute>}/>
            <Route path='/profile/:id' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
            <Route path='/account/edit' element={<ProtectedRoute><EditProfile/></ProtectedRoute>}/>
            <Route path='/chat' element={<ProtectedRoute><ChatPage/></ProtectedRoute>}/>

          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App