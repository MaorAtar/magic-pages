import { Image } from '@nextui-org/react';
import React, { useState } from 'react'
import { OptionField } from './StoryType';

function ImageStyle({userSelection}:any) {
    const OptionList = [
        {
            label: 'תלת מימדי',
            imageUrl: '/3D.png',
            isFree: true
        },
        {
            label: 'חתכי נייר',
            imageUrl: '/paperCut.png',
            isFree: true
        },
        {
            label: 'צבעי מים',
            imageUrl: '/watercolor.png',
            isFree: true
        },
        {
            label: 'פיקסלים',
            imageUrl: '/pixel.png',
            isFree: true
        }
    ];

    const [selectedOption, setSelectedOption]=useState<string>();

    const onUserSelect=(item:OptionField)=>{
        setSelectedOption(item.label);
        userSelection({
            fieldValue:item?.label,
            fieldName:'imageStyle'
        })
    }
    
    return (
        <div>
            <label className="font-bold text-4xl text-primary">4. סוג התמונה</label>
            <div className="grid grid-cols-3 gap-5 mt-3">
                {OptionList.map((item, index) => (
                    <div key={index} className={`"relative grayscale hover:grayscale-0 cursor-pointer p-1"
                        ${selectedOption==item.label?'grayscale-0':'grayscale'}
                        `}
                    onClick={()=>onUserSelect(item)}>
                        <Image 
                            src={item.imageUrl} 
                            alt={item.label} 
                            width={260} 
                            height={180}
                            className="object-cover h-[120px] rounded-3xl"
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

export default ImageStyle