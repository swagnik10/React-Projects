import React,{useContext} from 'react'
import UserContext from '../context/UserContext'

function Profile() {
    const {user} = useContext(UserContext);
    if(!user || !user.user.trim()) return (
        <div>
            <h2>Please Login</h2>
        </div>
    )

  return (
    <div>
        <h2>Profile</h2>
        <p>Welcome {user.user}</p>
    </div>
  )
}

export default Profile
