import { useRouter } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

type ButtonType = "back" | "home"

export function BackButton( { type }: { type: ButtonType }) {
  const router = useRouter();

  return (
    <Button
      className="w-fit ml-2 cursor-pointer"
      onClick={() => 
        type === "back" 
        ? router.history.back()
        : router.navigate({ to: "/"})
      }>
      <ArrowLeft />
    </Button>
  );
}