"use client"

import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { desc, eq } from 'drizzle-orm'
import StoryItemCard from './StoryItemCard';
import CustomLoader from '@/app/create-story/_components/CustomLoader';

type StoryItemType = {
    ageGroup:string,
    coverImage:string,
    id:number,
    imageStyle:string,
    output:[]|any,
    storyId:string,
    storySubject:string, 
    storyType:string, 
    userEmail:string, 
    userImage:string, 
    userName:string
}

function UserStoryList() {
    const {user} = useUser();
    const [storyList, setStoryList]=useState<StoryItemType>();

    useEffect(()=>{
        user && getUserStory();
    },[user])

    const getUserStory= async ()=>{
        const result:any = await db.select().from(StoryData).where(eq(StoryData.userEmail, user?.primaryEmailAddress?.emailAddress??''))
        .orderBy(desc(StoryData.id));

        console.log(result);
        setStoryList(result);
    }    
  
 return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10'>
            {storyList&&storyList.map((item:StoryItemType,index:number)=>(
                <StoryItemCard story={item} />
            ))}
        </div>
    </div>
  )
}

export default UserStoryList