import { useRef, useState } from "react";
import { SlidingBlock } from "../GameLogic/SlidingBlock";
import { getBoard } from "./puzzleData";

const initialDifficulty = 'very-easy';

export function useSlidingBlock() {
  const [difficulty, setDifficulty] = useState<string>(initialDifficulty);
  const [, setUpdate] = useState<boolean>(false);
  const gameRef = useRef<SlidingBlock>(new SlidingBlock(getBoard(difficulty), tick));
  function tick() {
    setUpdate(t => !t);
  }

  function reset() {
    gameRef.current = new SlidingBlock(getBoard(difficulty), tick);
    tick();
  }

  function changeDifficulty(diff: string) {
    setDifficulty(diff);
    gameRef.current = new SlidingBlock(getBoard(diff), tick);
  }

  return {
    difficulty,
    gameRef,
    tick,
    reset,
    changeDifficulty,
  }
}
