import type { Block } from '../GameLogic/SlidingBlock'

export const diffs = [
    { value: 'very-easy', name: 'Very Easy' },
    { value: 'easy', name: 'Easy' },
    { value: 'medium', name: 'Medium' },
    { value: 'hard', name: 'Hard' },
    { value: 'very-hard', name: 'Very Hard' }
]

export function getBoard(diff: string) {
    switch (diff) {
        case 'very-easy':
            return veryEasyBoard;
        case 'easy':
            return easyBoard;
        case 'medium':
            return mediumBoard;
        case 'hard':
            return hardBoard;
        case 'very-hard':
            return veryHardBoard;
        default:
            return hardBoard;
    }
}

export const veryEasyBoard: Block[] = [
  { id: "main", r: 2, c: 1, w: 2, h: 1 },
  { id: "a", r: 0, c: 0, w: 1, h: 2 },
  { id: "b", r: 0, c: 3, w: 2, h: 1 },
  { id: "c", r: 3, c: 2, w: 1, h: 3 },
]

export const easyBoard: Block[] = [
    { id: 'main', r: 2, c: 0, h: 1, w: 2 },
    { id: 'b1', r: 0, c: 0, h: 1, w: 3 },
    { id: 'b2', r: 1, c: 2, h: 3, w: 1 },
    { id: 'b3', r: 0, c: 5, h: 3, w: 1 },
    { id: 'b4', r: 3, c: 0, h: 2, w: 1 },
    { id: 'b5', r: 3, c: 4, h: 1, w: 2 },
    { id: 'b6', r: 5, c: 0, h: 1, w: 3 },
    { id: 'b7', r: 4, c: 4, h: 2, w: 1 },
]

export const mediumBoard: Block[] = [
    { id: 'main', r: 2, c: 1, h: 1, w: 2 },
    { id: 'b1', r: 0, c: 2, h: 1, w: 2 },
    { id: 'b2', r: 0, c: 5, h: 2, w: 1 },
    { id: 'b3', r: 5, c: 2, h: 1, w: 2 },
    { id: 'b4', r: 3, c: 3, h: 2, w: 1 },
    { id: 'b5', r: 1, c: 3, h: 2, w: 1 },
    { id: 'b6', r: 2, c: 5, h: 2, w: 1 },
    { id: 'b7', r: 1, c: 0, h: 3, w: 1 },
    { id: 'b8', r: 0, c: 1, h: 2, w: 1 },
]

export const hardBoard: Block[] = [
    { id: 'main', r: 2, c: 0, h: 1, w: 2 },
    { id: 'b1', r: 2, c: 3, h: 2, w: 1 },
    { id: 'b2', r: 5, c: 1, h: 1, w: 2 },
    { id: 'b3', r: 0, c: 4, h: 1, w: 2 },
    { id: 'b4', r: 4, c: 1, h: 1, w: 3 },
    { id: 'b5', r: 3, c: 5, h: 3, w: 1 },
    { id: 'b6', r: 3, c: 4, h: 2, w: 1 },
    { id: 'b7', r: 0, c: 2, h: 2, w: 1 },
    { id: 'b8', r: 2, c: 2, h: 2, w: 1 },
    { id: 'b9', r: 5, c: 3, h: 1, w: 2 },
    { id: 'b10', r: 0, c: 1, h: 2, w: 1 },
]

export const veryHardBoard: Block[] = [
    { id: 'main', r: 2, c: 0, h: 1, w: 2 },
    { id: 'b1', r: 2, c: 5, h: 3, w: 1 },
    { id: 'b2', r: 2, c: 3, h: 2, w: 1 },
    { id: 'b3', r: 1, c: 4, h: 2, w: 1 },
    { id: 'b4', r: 4, c: 1, h: 1, w: 2 },
    { id: 'b5', r: 3, c: 1, h: 1, w: 2 },
    { id: 'b6', r: 0, c: 3, h: 1, w: 3 },
    { id: 'b7', r: 4, c: 4, h: 2, w: 1 },
    { id: 'b8', r: 0, c: 2, h: 2, w: 1 },
    { id: 'b9', r: 4, c: 3, h: 2, w: 1 },
    { id: 'b10', r: 1, c: 0, h: 1, w: 2 },
    { id: 'b11', r: 3, c: 0, h: 2, w: 1 },
]
