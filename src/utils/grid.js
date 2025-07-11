export const numRows = 15;
export const numCols = 30;
export const startNode = { row: 0, col: 0 };
export const endNode = { row: 14, col: 29 };

export function createGrid() {
  const grid = [];
  for (let row = 0; row < numRows; row++) {
    const currentRow = [];
    for (let col = 0; col < numCols; col++) {
      currentRow.push({
        row,
        col,
        isStart: row === startNode.row && col === startNode.col,
        isEnd: row === endNode.row && col === endNode.col,
        distance: Infinity,
        visited: false,
        isWall: false,
        previousNode: null,
        fScore: Infinity
      });
    }
    grid.push(currentRow);
  }
  return grid;
}

export function getNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < numRows - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < numCols - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(n => !n.visited && !n.isWall);
} 