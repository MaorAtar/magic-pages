import { Button, Image, Link } from '@nextui-org/react'
import React from 'react'

function Hero() {
  return (
    <div className='px-10 md:px-28 lg:px-44 mt-10 h-screen'>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div>
                <h2 className='text-[70px] text-primary font-extrabold py-10'>
                        צור סיפורי ילדים קסומים במהירות
                </h2>
                <p className='text-2xl text-primary'>
                סיפורי ילדים קסומים בלחיצת כפתור - עולם דמיון אישי לילדיכם נוצר בהבזק, מלא בהרפתקאות וחוויות מעוררות השראה לקריאה
                </p>
                <Link href={'/create-story'}>
                    <Button size='lg' color='primary' className='mt-5 font-bold text-2xl p-10'>צור סיפור</Button>
                </Link>
            </div>
            <div>
                <Image src='/hero.png' alt='hero' width={700} height={700}/>
            </div>
        </div>
    </div>
  )
}

export default Hero