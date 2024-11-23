"use client"

import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { PayPalButtons } from '@paypal/react-paypal-js';
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '../_context/UserDetailContext';
import { eq, not } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function BuyCredits() {
    const Options = [
        {
            id: 1,
            price: 9.99,
            credits: 10
        },
        {
            id: 2,
            price: 24.99,
            credits: 30
        },
        {
            id: 3,
            price: 49.99,
            credits: 75
        },
        {
            id: 4,
            price: 99.99,
            credits: 150
        }
    ]

    const [selectedPrice, setSelectedPrice] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<number>(0);
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const router = useRouter();
    const notify = (msg:string) => toast(msg);
    const notifyError = (msg:string) => toast.error(msg);

    useEffect(()=>{
        if(selectedOption!=0) {
            const price = Options[selectedOption-1].price;
            console.log(price);
            setSelectedPrice(price);
        }
    },[selectedOption])

    const onPaymentSuccess = async () => {
        const result = await db.update(Users)
        .set({
            credit: Options[selectedOption-1].credits + userDetail.credit
        }).where(eq(Users.userEmail,userDetail.userEmail));
        if(result) {
            notify("מטבעות נוספו בהצלחה");
            setUserDetail((prev:any)=>({
                ...prev,
                ['credit']: Options[selectedOption-1].credits + userDetail.credit
            }))
            router.replace('/dashboard');
        } else {
            notifyError("שגיאת שרת");
        }
        
    }

  return (
    <div dir='rtl' className='min-h-screen p-10 md:px-20 lg:px-40 text-center'>
        <h2 className='text-4xl font-bold text-primary'>קנה עוד מטבעות</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10 items-center justify-center'>
            <div>
                {Options.map((option, index)=>(
                    <div className={`p-6 my-3 border bg-primary text-center text-white rounded-lg
                     cursor-pointer hover:scale-105 transition-all
                     ${selectedOption==option.id&&'bg-green-500'}
                     `} 
                     onClick={()=>setSelectedOption(option.id)}>
                        <h2>קבל {option.credits} מטבעות</h2>
                        <h2 className='font-bold text-2xl'>{option.price}₪</h2>
                    </div>
                ))}
            </div>
            <div>
                {selectedPrice > 0 && <PayPalButtons style={{ layout: "vertical" }} 
                disabled = {!selectedOption || selectedOption == 0}
                // @ts-ignore
                onApprove={()=>onPaymentSuccess()}
                onCancel={()=>notifyError("קנייה בוטלה")}
                createOrder={(data, actions) => {
                    // @ts-ignore
                    return actions.order.create({
                        purchase_units:[
                            {
                                amount:{
                                    value: selectedPrice.toFixed(2),
                                    currency_code: 'ILS'
                                }
                            }
                        ]
                    })
                }}
                />}
            </div>
        </div>
    </div>
  )
}

export default BuyCredits