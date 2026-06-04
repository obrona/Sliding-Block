

// horizontal sliding blocks have w > h.
// vertical sliding blocks have w < h.
// no blocks have h == w.
// height refers to row, width refers to col.
// for horizontal blocks, (r, c) is the leftmost coor.
// for vertical blocks, (r, c) is the topmost coor.
// all blocks are either h * 1 or 1 * w.

// the out block has the id 'main'
export type Block = {
    id: string;
    r: number;
    c: number;
    h: number;
    w: number;
}

function getBlockOrientation(b: Block) {
    return (b.h > b.w) ? 'vertical' : 'horizontal';
}

// in 
export class SlidingBlock {
    R: number = 6;
    C: number = 6;
    blocks: Block[];
    outRow: number = 2; // the out slot is always at the right i.e at (outRow, C - 1)
    history: Block[] = [];
    updateFn: () => void;

    constructor(blocks: Block[], updateFn: () => void = () => {}) {
        this.blocks = structuredClone(blocks); // take a deep copy !
        this.updateFn = updateFn;
    }

    getMyCells(b: Block): string[] {
        const out = [];
        for (let r = b.r; r < b.r + b.h; r++) {
            for (let c = b.c; c < b.c + b.w; c++) {
                out.push(`${r},${c}`);
            }
        }
        return out;
    }

    // for the main block, it is okay for it to be out of bounds for certain columns
    // as we want users to be able to visually push it out.
    isInBounds(r: number, c: number, b: Block) {
        if (b.id !== 'main') {
            return r >= 0 && r < this.R && c >= 0 && c < this.C;
        } else {
            return r >= 0 && r < this.R && c >= 0 && c < this.C + b.w;
        }
    }

    isInBlock(r: number, c: number, b: Block) {
        const { r: br, c: bc } = b;
        const dr = r - br, dc = c - bc;
        if (dr >= 0 && dc >= 0 && dr < b.h && dc < b.w) {
            return true;
        } else {
            return false;
        }
    }

    // win when r, c of main block is at (outRow, this.C - 1)
    isWin() {
        const outBlock = this.blocks.find(b => b.id === 'main')!;
        return outBlock.r === this.outRow && outBlock.c === this.C - 1;
    }

    // the mouse movement can allow for different nr, nc but we do not want to reject that
    // just because nr is different (for example).
    moveBlock(b: Block, nr: number, nc: number) {
        if (this.isWin()) return false;
        
        if (nr === b.r && nc === b.c) return false;

        let can = true;
        const orient = getBlockOrientation(b);
        // adjust nr, nc depending on whether the orientation is vertical or horizontal.
        if (orient === 'horizontal') nr = b.r;
        if (orient === 'vertical') nc = b.c;
        
        outer:
        for (let r = nr; r < nr + b.h; r++) {
            for (let c = nc; c < nc + b.w; c++) {
                if (!this.isInBounds(r, c, b)) {
                    can = false;
                    break outer;
                }

                for (const bl of this.blocks) {
                    if (bl === b) continue;
                    if (this.isInBlock(r, c, bl)) {
                        can = false;
                        break outer;
                    }
                }
            }
        }

        if (!can) return false;
        this.history.push(structuredClone(b));
        b.r = nr;
        b.c = nc;
        this.updateFn();
    }

    undo() {
        if (this.history.length === 0) return false;

        const b = this.history.pop()!;
        const nowB = this.blocks.find(bl => bl.id === b.id)!;
        nowB.r = b.r;
        nowB.c = b.c;
        this.updateFn();
        return true;
    }
}
