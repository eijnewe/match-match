import { cn } from '@/lib/utils'

export function PageContainer({
  className,
  children,
}: React.ComponentProps<'main'>) {
  return (
    <main
      className={cn(
        'mx-auto p-4 md:p-6 w-full flex place-content-center justify-center items-center',
        className,
      )}
      style={{
        minHeight: 'calc(100vh - var(--header-height, 80px))',
      }}
    >
      {children}
    </main>
  )
}