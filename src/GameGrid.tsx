import { useLayoutEffect, useRef, useState } from "react";
import { SlidingBlock } from "./GameLogic/SlidingBlock";
import type { Block } from "./GameLogic/SlidingBlock";

const GRID_SIZE = 480;
const CELL_SIZE = 80;
const EXIT_ROW = 2;
const BORDER_SIZE = 2;

const normalBlockColor = {
  backgroundColor: '#c15454',
  border: '2px solid #5C3317'
}

const mainBlockColor = {
  backgroundColor: '#86EFAC',
  border: '#166534',
}

type DragState = {
  startX: number;
  startY: number;
  startR: number;
  startC: number;
  targetBlock: Block;
}

interface GameGridProps {
  game: SlidingBlock;
}

export function GameGrid({ game }: GameGridProps) {
  const [transition, setTransition] = useState<boolean>(false);
  const dragStateRef = useRef<DragState | null>(null);

  function handlePointerDown(ev: React.PointerEvent<HTMLDivElement>, b: Block) {
    ev.currentTarget.setPointerCapture(ev.pointerId);
    dragStateRef.current = {
      startX: ev.clientX,
      startY: ev.clientY,
      startR: b.r,
      startC: b.c,
      targetBlock: b,
    }
  }

  function handlePointerMove(ev: React.PointerEvent<HTMLDivElement>) {
    if (!dragStateRef.current) return;
    const dx = ev.clientX - dragStateRef.current.startX;
    const dy = ev.clientY - dragStateRef.current.startY;
    const dr = Math.round(dy / CELL_SIZE);
    const dc = Math.round(dx / CELL_SIZE);
    const { startR, startC, targetBlock } = dragStateRef.current;
    const isVertical = targetBlock.h > targetBlock.w;

    game.moveBlock(
      targetBlock,
      isVertical ? startR + dr : startR,
      isVertical ? startC : startC + dc
    );
  }

  function handlePointerUp() {
    dragStateRef.current = null;
  }

  useLayoutEffect(() => {
    setTransition(false);
    const frame = requestAnimationFrame(() => setTransition(true));
    return () => cancelAnimationFrame(frame);
  }, [game]);
  
  return (
    <div
      style={{
        position: 'relative',
        height: `${GRID_SIZE}px`,
        width: `${GRID_SIZE}px`,
        background: 'linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)',
        backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
        border: `${BORDER_SIZE}px solid gray`,
      }}
      
    >
      <div
        style={{
          position: 'absolute',
          top: `${EXIT_ROW * CELL_SIZE}px`,
          right: `${-BORDER_SIZE}px`,
          width: `${BORDER_SIZE}px`,
          height: `${CELL_SIZE}px`,
          background: 'white',
        }}
      />
      {game.blocks.map(b => {
        const height = b.h * CELL_SIZE;
        const width = b.w * CELL_SIZE;
        const tx = b.c * CELL_SIZE;
        const ty = b.r * CELL_SIZE;

        const colorProps = (b.id === 'main') ? mainBlockColor : normalBlockColor;

        return (
          <div 
            style={{
              position: 'absolute',
              boxSizing: 'border-box',
              height: `${height}px`,
              width: `${width}px`,
              transform: `translate(${tx}px, ${ty}px)`,
              borderRadius: '12px',
              transition: transition ? 'transform 80ms linear' : '',
              touchAction: 'none',
              ...colorProps
            }}
            key={b.id}
            onPointerDown={(ev) => handlePointerDown(ev, b)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          />
        )
      })}



    </div>
  )
}
