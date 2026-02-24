import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { PageContainer } from '@/components/layout/PageContainer'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <PageContainer>
      <div className='flex flex-col items-center *:m-2'>
        <Button
          size="lg"
          className="w-29.5"
          render={<Link to="/game">Start game</Link>}
        />
        <Button
          size="lg"
          className="w-29.5"
          render={<Link to="/">How to Play</Link>}
        />
      </div>
    </PageContainer>
  )
}
