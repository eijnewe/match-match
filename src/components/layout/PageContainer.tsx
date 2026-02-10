import { cn } from '@/lib/utils'

export function PageContainer({
  className,
  children,
}: React.ComponentProps<'main'>) {
  return (
    <main
      className={cn(
        'mx-auto p-4 md:p-6 w-full grow flex place-content-center justify-center items-center',
        className,
      )}
    >
      {children}
    </main>
  )
}
