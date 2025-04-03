import React from 'react'
import HomeScreen from './HomeScreen'
import AuthScreen from './AuthScreen'
import { useAuthUser } from '../../store/authUser.js';
const HomePage = () => {
  const {user} = useAuthUser(); ;
  return (
    <div>
      {user ? <HomeScreen/> : <AuthScreen/>}
    </div>
  )
}

export default HomePage