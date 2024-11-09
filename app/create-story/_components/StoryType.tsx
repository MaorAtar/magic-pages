"use client"

import { Image } from '@nextui-org/react';
import React, { useState } from 'react';

export interface OptionField {
    label:string,
    imageUrl:string,
    isFree:boolean
}

function StoryType({userSelection}:any) {
    const OptionList = [
        {
            label: 'סיפור',
            imageUrl: '/story.png',
            isFree: true
        },
        {
            label: 'סיפור לפני שינה',
            imageUrl: '/bedstory.png',
            isFree: true
        },
        {
            label: 'חינוכי',
            imageUrl: '/educational.png',
            isFree: true
        }
    ];

    const [selectedOption, setSelectedOption]=useState<string>();

    const onUserSelect=(item:OptionField)=>{
        setSelectedOption(item.label);
        userSelection({
            fieldValue:item?.label,
            fieldName:'storyType'
        })
    }

    return (
        <div>
            <label className="font-bold text-4xl text-primary">2. סוג הסיפור</label>
            <div className="grid grid-cols-3 gap-5 mt-3">
                {OptionList.map((item, index) => (
                    <div key={index} className={`"relative grayscale hover:grayscale-0 cursor-pointer p-1"
                        ${selectedOption==item.label?'grayscale-0':'grayscale'}
                        `}
                    onClick={()=>onUserSelect(item)}>
                        <Image 
                            src={item.imageUrl} 
                            alt={item.label} 
                            width={300} 
                            height={380}
                            className="object-cover h-[260px] rounded-3xl"
                        />
                        <h2 className="absolute bottom-5 left-0 text-2xl text-white text-center w-full z-10">
                            {item.label}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StoryType;
