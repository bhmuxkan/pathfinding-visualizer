export function dijkstra(grid, start, end, getNeighbors) {
  const visitedNodes = [];
  const unvisited = [];
  start.distance = 0;
  grid.forEach(row => row.forEach(node => unvisited.push(node)));

  while (unvisited.length) {
    unvisited.sort((a, b) => a.distance - b.distance);
    const closest = unvisited.shift();
    if (closest.isWall) continue;
    if (closest.distance === Infinity) return visitedNodes;
    closest.visited = true;
    visitedNodes.push(closest);
    if (closest === end) return visitedNodes;
    const neighbors = getNeighbors(closest, grid);
    neighbors.forEach(neighbor => {
      if (closest.distance + 1 < neighbor.distance) {
        neighbor.distance = closest.distance + 1;
        neighbor.previousNode = closest;
      }
    });
  }
  return visitedNodes;
} 