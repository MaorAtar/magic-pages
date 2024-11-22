import Image from 'next/image'
import React from 'react'

function DashBoardHeader() {
  return (
    <div dir='rtl' className='p-7 bg-primary'>
        <h2 className='font-bold text-3xl text-white text-right flex justify-between items-center'>הסיפורים שלי</h2>
        <div className='flex gap-3 items-center'>
            <Image src={'/coin.png'} alt='coin' width={50} height={50} />
            <span className='text-2xl'>3 מטבעות נותרו</span>
        </div>
    </div>
  )
}

export default DashBoardHeader