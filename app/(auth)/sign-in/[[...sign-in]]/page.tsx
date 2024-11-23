import { SignIn } from '@clerk/nextjs'
import { Image } from '@nextui-org/react'

export default function Page() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 items-center'>
        <div className='flex justify-center md:justify-end items-center h-full p-4'>
            <Image src={'/login.png'} alt='login' width={490} height={750} className='w-full'/>
        </div>
        <div className='flex justify-center items-center h-screen order-first md:order-last'>
            <SignIn />
        </div>
    </div>
  )
}