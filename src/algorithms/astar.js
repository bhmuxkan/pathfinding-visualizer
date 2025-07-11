function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function astar(grid, start, end, getNeighbors) {
  const openSet = [start];
  start.distance = 0;
  start.fScore = heuristic(start, end);
  const visitedNodes = [];

  while (openSet.length) {
    openSet.sort((a, b) => a.fScore - b.fScore);
    const current = openSet.shift();
    current.visited = true;
    visitedNodes.push(current);

    if (current === end) return visitedNodes;

    const neighbors = getNeighbors(current, grid);
    neighbors.forEach(neighbor => {
      const tempG = current.distance + 1;
      if (tempG < neighbor.distance) {
        neighbor.distance = tempG;
        neighbor.fScore = tempG + heuristic(neighbor, end);
        neighbor.previousNode = current;
        if (!openSet.includes(neighbor)) openSet.push(neighbor);
      }
    });
  }
  return visitedNodes;
} 