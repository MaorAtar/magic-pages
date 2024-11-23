"use client"

import { UserDetailContext } from '@/app/_context/UserDetailContext'
import Image from 'next/image'
import React, { useContext } from 'react'

function DashBoardHeader() {
  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  return (
    <div dir='rtl' className='p-7 bg-primary'>
        <h2 className='font-bold text-3xl text-white text-right flex justify-between items-center'>הסיפורים שלי</h2>
        <div className='flex gap-3 items-center'>
            <Image src={'/coin.png'} alt='coin' width={50} height={50} />
            <span className='text-2xl'>{userDetail?.credit} מטבעות נותרו</span>
        </div>
    </div>
  )
}

export default DashBoardHeader