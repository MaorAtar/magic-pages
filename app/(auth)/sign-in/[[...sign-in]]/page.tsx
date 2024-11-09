import { SignIn } from '@clerk/nextjs'
import { Image } from '@nextui-org/react'

export default function Page() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
            <Image src={'/login.png'} alt='login' width={520} height={780} className='w-full'/>
        </div>
        <div className='flex justify-center items-center h-screen order-first md:order-last'>
            <SignIn />
        </div>
    </div>
  )
}