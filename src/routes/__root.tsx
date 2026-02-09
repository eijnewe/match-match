import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import { PageContainer } from '@/components/layout/PageContainer'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen items-stretch">
        <ModeToggle />
        <div>Hello "__root"!</div>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </div>
    </ThemeProvider>
  )
}
