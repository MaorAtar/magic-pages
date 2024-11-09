import { heIL } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'

function Provider({children}:{children: React.ReactNode}) {
  return (
    <ClerkProvider localization={heIL}>
      <NextUIProvider>
          {children}
      </NextUIProvider>
    </ClerkProvider>
  )
}

export default Provider