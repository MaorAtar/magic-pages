import { Image } from '@nextui-org/react';
import React, { useState } from 'react'

function AgeGroup() {
    const OptionList = [
        {
            label: 'גילאי 0-2',
            imageUrl: '/02Years.png',
            isFree: true
        },
        {
            label: 'גילאי 3-5',
            imageUrl: '/35Years.png',
            isFree: true
        },
        {
            label: 'גילאי 5-8',
            imageUrl: '/58Years.png',
            isFree: true
        }
    ];

    const [selectedOption, setSelectedOption]=useState<string>();

    return (
        <div>
            <label className="font-bold text-4xl text-primary">3. קבוצות גילאים</label>
            <div className="grid grid-cols-3 gap-5 mt-3">
                {OptionList.map((item, index) => (
                    <div key={index} className={`"relative grayscale hover:grayscale-0 cursor-pointer p-1"
                        ${selectedOption==item.label?'grayscale-0':'grayscale'}
                        `}
                    onClick={()=>setSelectedOption(item.label)}>
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

export default AgeGroup