import { PageContainer } from '@/components/layout/PageContainer'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CustomTextArea } from '@/features/game/components/CustomTextArea'
import type { Difficulty } from '@/types/game'
import { createFileRoute, Link } from '@tanstack/react-router'
import { InfoIcon } from 'lucide-react'

export const Route = createFileRoute('/game/')({
  component: GameIndex,
})


function GameIndex() {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard']

  return (
    <>
      <PageContainer>
        <div className='flex items-center flex-col'>
          <h3>Choose difficulty</h3>
          <ul className="flex flex-col *:m-2">
            {difficulties.map((d: Difficulty) => (
              <li key={d}>
                <Button
                  size="lg"
                  className={'w-full'}
                  nativeButton={false}
                  render={
                    <Link
                      to="/game/$difficulty"
                      className="capitalize"
                      params={{ difficulty: d }}
                    >
                      {d}
                    </Link>
                  }
                ></Button>
              </li>
            ))}
            <Tooltip>
              <TooltipTrigger>
                <h4 className='-mb-3 flex items-center justify-center text-md'>
                  Custom difficulty
                  <InfoIcon size="16" className='ml-1' />
                </h4>
              </TooltipTrigger>
              <TooltipContent className="text-center">
                Choose a custom amount of <b>Category</b> cards.<br/>
                Each Category will have as many <b>Article</b> cards as there are Categories: with 4 Categories, you have a total of 16 Article cards to sort.<br />
                With the maximum amount of 30 Categories, you get 900 cards.
              </TooltipContent>
            </Tooltip>
            <li>
              <CustomTextArea />
            </li>
          </ul>
        </div>
      </PageContainer>
    </>
  )
}
