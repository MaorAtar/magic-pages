"use client"

import React, { useState } from 'react'
import StorySubjectInput from './_components/StorySubjectInput'
import StoryType from './_components/StoryType'
import AgeGroup from './_components/AgeGroup'
import ImageStyle from './_components/ImageStyle'
import { Button } from '@nextui-org/button'
import { chatSession } from '@/config/GeminiAi'
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import uuid4 from "uuid4";
import CustomLoader from './_components/CustomLoader'

const CREATE_STORY_PROMPT=process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT;

export interface fieldData{
  fieldName:string,
  fieldValue:string
}

export interface formDataType{
  storySubject:string,
  storyType:string,
  imageStyle:string,
  ageGroup:string
}

function CreateStory() {
  const [formData,setFormData]=useState<formDataType>();
  const[loading,setLoading]=useState(false);

  const onHandleUserSelection=(data:fieldData)=>{
    setFormData((prev:any)=>({
      ...prev,
      [data.fieldName]:data.fieldValue
    }));
    console.log(formData);
  }

  const GenerateStory=async()=>{
    setLoading(true);
    const FINAL_PROMPT=CREATE_STORY_PROMPT
    ?.replace('{ageGroup}', formData?.ageGroup??'')
    .replace('{storyType}', formData?.storyType??'')
    .replace('{storySubject}', formData?.storySubject??'')
    .replace('{imageStyle}', formData?.imageStyle??'');

    // Generate AI Story
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response.text());
      setLoading(false);
      const resp = await SaveInDB(result?.response.text());
      console.log(resp);
    } catch(e) {
      console.log(e);
      setLoading(false);
    }
    // Save in DB


    // Generate Image
  }

  const SaveInDB=async(output:string)=>{
    const recordId=uuid4();
    setLoading(true);
    try {
      const result = await db.insert(StoryData).values({
        storyId:recordId,
        ageGroup:formData?.ageGroup,
        imageStyle:formData?.imageStyle,
        storySubject:formData?.storySubject,
        storyType:formData?.storyType,
        output:JSON.parse(output)
      }).returning({storyId:StoryData?.storyId})
      setLoading(false);
      return result;
    } catch(e) {
      setLoading(false);
    }
  }

  return (
    <div className='p-10 md:px-20 lg:px-40'>
      <h2 className='font-extrabold text-[70px] text-primary text-center'>צור סיפור</h2>
      <p className='text-2xl text-primary text-center'>!השתמשו ביצירתיות ובבינה מלאכותית כדי ליצור סיפורים קסומים ומותאמים אישית לילדיכם - מסעות דמיון שנבנים בלחיצת כפתור</p>
    
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-14'>
          {/* Story Subject */}
          <StorySubjectInput userSelection={onHandleUserSelection}/>
          {/* Story Type */}
          <StoryType userSelection={onHandleUserSelection} />
          {/* Age Group */}
          <AgeGroup userSelection={onHandleUserSelection} />
          {/* Image Style */}
          <ImageStyle userSelection={onHandleUserSelection} />
      </div>
      <div className='flex justify-end my-10'>
        <Button color='primary' className='p-10 text-2xl' disabled={loading} onClick={GenerateStory}>צור סיפור</Button>
      </div>
      <CustomLoader isLoading={loading}/>
    </div>
  )
}

export default CreateStory