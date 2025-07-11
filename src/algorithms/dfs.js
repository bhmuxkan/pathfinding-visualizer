export function dfs(grid, start, end, getNeighbors) {
  const stack = [start];
  const visitedNodes = [];

  while (stack.length) {
    const node = stack.pop();
    if (!node.visited) {
      node.visited = true;
      visitedNodes.push(node);
      if (node === end) return visitedNodes;
      const neighbors = getNeighbors(node, grid);
      neighbors.forEach(neighbor => {
        if (!neighbor.visited && !neighbor.isWall) {
          neighbor.previousNode = node;
          stack.push(neighbor);
        }
      });
    }
  }
  return visitedNodes;
} 