import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/screens/Home'
import SignIn from './components/screens/SignIn'
import SignUp from './components/screens/SignUp'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/CreatePost';
import {BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts from './components/screens/SubscribesUserPosts'
import Reset from './components/screens/Reset'
import NewPassword from './components/screens/NewPassword'
export const UserContext = createContext()

const Routing = ()=>{
  
  const navigate = useNavigate()
  
  const {state,dispatch} = useContext(UserContext)
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(!navigate.location.pathname.startsWith('/reset'))
        navigate('http://localhost:3000/signin')
    }
  },[])

  return(
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/createpost" element={<CreatePost/>} />
      <Route path="/profile/:userid" element={<UserProfile />} />
      <Route path="/reset" element={<Reset/>} />
      <Route path="/reset/:token" element={<NewPassword />} />
      <Route path="/myfollowingpost" element={<SubscribedUserPosts />} />
    </Routes>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
