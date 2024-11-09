import { heIL } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import Header from './_components/Header'

function Provider({children}:{children: React.ReactNode}) {
  return (
    <ClerkProvider localization={heIL}>
      <NextUIProvider>
                  {/* Header */}
                  <Header/>
          {children}
      </NextUIProvider>
    </ClerkProvider>
  )
}

export default Provider