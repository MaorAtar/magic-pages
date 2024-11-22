"use client"
import React, { useState } from 'react'
import {
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
  } from "@nextui-org/navbar";
import { Button, Image, Link } from '@nextui-org/react';
import { UserButton, useUser } from '@clerk/nextjs';

function Header() {

    const {user, isSignedIn}=useUser();

    const MenuList=[
        {
            name:'דף הבית',
            path:'/',
        },
        {
            name:'צור סיפור',
            path:'/create-story',
        },
        {
            name:'גלה סיפורים',
            path:'/explore',
        },
        {
            name:'צור קשר',
            path:'/contact-us',
        }
    ]

    const [isMenuOpen,setIsMenuOpen]=useState(false);

  return (
    <Navbar maxWidth='full' onMenuOpenChange={setIsMenuOpen} className='primary'>
        <NavbarContent>
            <NavbarMenuToggle 
            aria-label={isMenuOpen?"Close menu":"Open menu"}
            className='text-primary sm:hidden'
            />
            <NavbarBrand>
                <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
                <h2 className='font-bold text-2xl text-primary ml-3'>Magic Pages</h2>
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify='center' className='hidden sm:flex'>
            {MenuList.map((item,index)=>(
                <NavbarItem className='text-xl text-primary font-medium hover:underline mx-2'>
                    <Link href={item.path}>
                        {item.name}
                    </Link>
                </NavbarItem>
            ))}
        </NavbarContent>
        <NavbarContent>
            <Link href={'/dashboard'}>
                <Button color='primary'> 
                    {isSignedIn?
                    'הספרים שלי':
                    'לחץ כדי להתחיל'
                    }
                </Button>
            </Link>
            <UserButton/>
        </NavbarContent>
        <NavbarMenu>
            {MenuList.map((item,index)=>(
                <NavbarMenuItem>
                    <Link href={item.path}>
                    {item.name}
                    </Link>
                </NavbarMenuItem>
            ))}
        </NavbarMenu>
    </Navbar>
  )
}

export default Header