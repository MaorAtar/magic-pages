import { Button, Image, Link } from '@nextui-org/react';
import React from 'react';

function Hero() {
  return (
    <div dir='rtl' className='px-5 sm:px-10 md:px-28 lg:px-44 mt-10 h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {/* Text Section */}
        <div className='flex flex-col justify-center gap-6'>
          <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-[70px] text-primary font-extrabold py-10'>
            צור סיפורי ילדים קסומים במהירות
          </h2>
          <p className='text-xl sm:text-2xl text-primary'>
            סיפורי ילדים קסומים בלחיצת כפתור - עולם דמיון אישי לילדיכם נוצר בהבזק, מלא בהרפתקאות וחוויות מעוררות השראה לקריאה
          </p>
          <Link href={'/create-story'}>
            <Button size='lg' color='primary' className='mt-5 font-bold text-lg sm:text-2xl px-8 sm:px-10 py-3 sm:py-5'>
              צור סיפור
            </Button>
          </Link>
        </div>

        {/* Image Section */}
        <div className='flex justify-center items-center'>
          <Image 
            src='/hero.png' 
            alt='hero' 
            width={500} 
            height={500} 
            className='sm:w-3/4 md:w-[70%] lg:w-[700px] lg:h-[700px] object-cover'
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
