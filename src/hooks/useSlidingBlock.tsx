import { useState } from "react";
import { SlidingBlock } from "../GameLogic/SlidingBlock";
import { getBoard } from "./puzzleData";

const initialDifficulty = 'very-easy';

export function useSlidingBlock() {
  const [difficulty, setDifficulty] = useState<string>(initialDifficulty);
  const [, setUpdate] = useState<boolean>(false);
  const [game, setGame] = useState<SlidingBlock>(() => (
    new SlidingBlock(getBoard(initialDifficulty), tick)
  ));
  
  function tick() {
    setUpdate(t => !t);
  }

  function reset() {
    setGame(new SlidingBlock(getBoard(difficulty), tick));
  }

  function changeDifficulty(diff: string) {
    setDifficulty(diff);
    setGame(new SlidingBlock(getBoard(diff), tick));
  }

  return {
    difficulty,
    game,
    tick,
    reset,
    changeDifficulty,
  }
}
