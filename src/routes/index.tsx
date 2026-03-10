import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { PageContainer } from '@/components/layout/PageContainer'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { HowToPlay } from '@/features/game/components/how-to-play'
import { Footer } from '@/components/footer'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <>
      <PageContainer className="gap-4 sm:flex-row flex-col">
        <div className="flex items-center flex-col">
          <img
            src="/src/assets/IconWoHand.png"
            alt="logo"
            width="100px"
            className="animate-bounce animation-duration-[3s] mb-4"
          />
          <h2 className="text-(--stark) sm:text-3xl text-md">matchmatch</h2>
        </div>
        <div className="flex flex-col items-center *:m-2">
          <Button
            size="lg"
            className="w-29.5"
            nativeButton={false}
            render={<Link to="/game">Start game</Link>}
          />
          <AlertDialog>
            <AlertDialogTrigger>How to play</AlertDialogTrigger>
            <AlertDialogContent
              aria-label="How to play"
              className={
                "flex flex-col items-center max-h-[90vh] lg:overflow-clip overflow-auto"
              }
            >
              <HowToPlay />
              <AlertDialogCancel
                className={
                  "w-fit cursor-pointer -mt-3 bg-primary text-(--stark)"
                }
                aria-label="Close pop-up"
              >
                Let's Go!
              </AlertDialogCancel>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}
