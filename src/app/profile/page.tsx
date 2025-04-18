import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'

const ProfilePage = async () => {

  const userData = await getCurrentUser();
  console.log('userData', userData);

  return (
    <div>
      ProfilePage
    </div>
  )
}

export default ProfilePage
