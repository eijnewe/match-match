import { useQuery } from "@tanstack/react-query";
import { getGameData } from "./getGameData";
import type { Difficulty, GameData } from "@/types/game";

export function useGameQuery(difficulty: Difficulty) {
  return useQuery<GameData>({
    queryKey: ["game", difficulty],
    queryFn: () => getGameData(difficulty),
    staleTime: Infinity,
  });
}
