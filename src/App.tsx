import './App.css'
import { GameGrid } from './GameGrid'
import { diffs } from './hooks/puzzleData';
import { useSlidingBlock } from './hooks/useSlidingBlock'

function App() {
  const {
    difficulty,
    game,
    reset,
    changeDifficulty,
  } = useSlidingBlock();

  const banner = (game.isWin()) ? 'You Win!' : '';

  return (
    <div className='min-h-screen w-screen grid grid-rows-[64px_1fr]'>
      <header className='flex items-center justify-between px-3 py-1 bg-blue-300'>
        <div className='[grid-area:1/1/2/-1] flex items-center gap-1 bg-white rounded-sm px-3 py-1 text-md'>
          <div className='cursor-default'>Level:&nbsp;</div>
          <select
            className='border border-gray-300 p-1 rounded-sm'
            value={difficulty}
            onChange={(ev) => changeDifficulty(ev.target.value)}
          >
          {diffs.map(d => (
            <option 
              key={d.value}
              value={d.value}
            >
              {d.name}
            </option>
          ))}
          </select>
        </div>

        <div className='text-2xl'>{banner}</div>

        <div className='space-x-2'>
          <button 
            className='bg-white px-2 py-1 text-lg rounded-sm hover:scale-110 cursor-pointer'
          >
            ↶
          </button>

          <button
            className='bg-white px-2 py-1 text-lg text-red-500 rounded-sm hover:scale-110 cursor-pointer'
            onClick={reset}
          >
            ↻
          </button>
        </div>
      </header>

      <div className='[grid-area:2/1/-1/-1] flex flex-col justify-center items-center'>
        <GameGrid game={game} />
      </div>

    </div>
  )
}

export default App
