"use client"

import { NextUIProvider } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Users } from '@/config/schema'
import { db } from '@/config/db'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { UserDetailContext } from './_context/UserDetailContext'

function Provider({children}:{children: React.ReactNode}) {

  const [userDetail, setUserDetail] = useState<any>();
  const {user} = useUser();
  useEffect(()=>{
    user && saveNewUserIfNotExist();
  },[user])


  const saveNewUserIfNotExist = async ()=>{
    const userResp = await db.select().from(Users)
    .where(eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress??''));
    console.log("Existing User",userResp);

    if(!userResp[0]) {
      const result = await db.insert(Users).values({
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
        userName: user?.fullName
      }).returning({
        userEmail: Users.userEmail,
        userName: Users.userName,
        userImage: Users.userImage,
        credit: Users.credit
      })
      console.log("New User", result[0])
      setUserDetail(result[0]);
    } else {
      setUserDetail(userResp[0]);
    }
  }

  return (
    <UserDetailContext.Provider value = {{userDetail, setUserDetail}}>
        <NextUIProvider>
                    {/* Header */}
                    <Header/>
            {children}
            <ToastContainer />
        </NextUIProvider>
    </UserDetailContext.Provider>
  )
}

export default Provider