"use client"

import React from 'react'
import StorySubjectInput from './_components/StorySubjectInput'
import StoryType from './_components/StoryType'
import AgeGroup from './_components/AgeGroup'
import ImageStyle from './_components/ImageStyle'

export interface fieldData{
  fieldName:string,
  fieldValue:string
}

function CreateStory() {

  const onHandleUserSelection=(data:fieldData)=>{
    console.log(data);
  }

  return (
    <div className='p-10 md:px-20 lg:px-40'>
      <h2 className='font-extrabold text-[70px] text-primary text-center'>צור סיפור</h2>
      <p className='text-2xl text-primary text-center'>!השתמשו ביצירתיות ובבינה מלאכותית כדי ליצור סיפורים קסומים ומותאמים אישית לילדיכם - מסעות דמיון שנבנים בלחיצת כפתור</p>
    
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-14'>
          {/* Story Subject */}
          <StorySubjectInput userSelection={onHandleUserSelection}/>
          {/* Story Type */}
          <StoryType />
          {/* Age Group */}
          <AgeGroup />
          {/* Image Style */}
          <ImageStyle />
      </div>
    
    </div>
  )
}

export default CreateStory