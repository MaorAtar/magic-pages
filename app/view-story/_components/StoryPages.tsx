import React from 'react'

function StoryPages({storyChapter}:any) {
  return (
    <div>
        <h2 className='text-2xl text-right fontbold text-primary'>{storyChapter?.chapter_title}</h2>
        <p dir="rtl" className='text-xl text-black p-10 mt-3 rounded-lg bg-slate-100'>
            {storyChapter?.text}
        </p>
    </div>
  )
}

export default StoryPages