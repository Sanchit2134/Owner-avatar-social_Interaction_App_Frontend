import ChatPage from './components/ChatPage'
import EditProfile from './components/EditProfile'
import Home from './components/Home'
import Login from './components/Login'
import Profile from './components/Profile'
import Signup from './components/Signup'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
const App = ()=> {
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