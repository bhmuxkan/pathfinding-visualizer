export function bfs(grid, start, end, getNeighbors) {
  const queue = [start];
  const visitedNodes = [];
  start.visited = true;

  while (queue.length) {
    const node = queue.shift();
    visitedNodes.push(node);
    if (node === end) return visitedNodes;
    const neighbors = getNeighbors(node, grid);
    neighbors.forEach(neighbor => {
      if (!neighbor.visited && !neighbor.isWall) {
        neighbor.visited = true;
        neighbor.previousNode = node;
        queue.push(neighbor);
      }
    });
  }
  return visitedNodes;
} 