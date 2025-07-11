// DijkstraVisualizer.jsx
import React, { useState, useEffect } from "react";
import { dijkstra } from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";
import { bfs } from "../algorithms/bfs";
import { dfs } from "../algorithms/dfs";
import { createGrid, getNeighbors, numRows, numCols, startNode, endNode } from "../utils/grid";

function getPath(end) {
  const path = [];
  let current = end;
  while (current !== null) {
    path.unshift(current);
    current = current.previousNode;
  }
  return path;
}

export default function DijkstraVisualizer() {
  const [grid, setGrid] = useState([]);
  const [running, setRunning] = useState(false);
  const [placingWall, setPlacingWall] = useState(false);
  const [stats, setStats] = useState(null);
  const [algorithm, setAlgorithm] = useState("dijkstra");

  useEffect(() => {
    setGrid(createGrid());
  }, []);

  const toggleWall = (row, col) => {
    if (running) return;
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (!node.isStart && !node.isEnd) node.isWall = !node.isWall;
    setGrid(newGrid);
  };

  const runAlgorithm = (grid, start, end) => {
    switch (algorithm) {
      case "bfs": return bfs(grid, start, end, getNeighbors);
      case "dfs": return dfs(grid, start, end, getNeighbors);
      case "astar": return astar(grid, start, end, getNeighbors);
      default: return dijkstra(grid, start, end, getNeighbors);
    }
  };

  const handleVisualize = () => {
    setRunning(true);
    const newGrid = grid.map(row => row.map(node => ({ ...node })));
    const start = newGrid[startNode.row][startNode.col];
    const end = newGrid[endNode.row][endNode.col];
    const visitedNodes = runAlgorithm(newGrid, start, end);
    const path = getPath(end);

    visitedNodes.forEach((node, idx) => {
      setTimeout(() => {
        const cell = document.getElementById(`node-${node.row}-${node.col}`);
        if (cell && !node.isStart && !node.isEnd) {
          cell.className = "grid-cell visited-node";
        }
      }, 20 * idx);
    });
    setTimeout(() => {
      path.forEach((node, idx) => {
        setTimeout(() => {
          const cell = document.getElementById(`node-${node.row}-${node.col}`);
          if (cell && !node.isStart && !node.isEnd) {
            cell.className = "grid-cell path-node";
          }
        }, 20 * idx);
      });
      setStats({
        visited: visitedNodes.length,
        pathLength: path.length,
        success: end.visited,
        used: algorithm === "astar" ? "A*/A-star" : algorithm.toUpperCase()
      });
      setRunning(false);
    }, 20 * visitedNodes.length);
  };

  const resetGrid = () => {
    const freshGrid = createGrid();
    setGrid(freshGrid);
    setStats(null);
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const node = freshGrid[row][col];
        const cell = document.getElementById(`node-${row}-${col}`);
        if (cell) {
          if (node.isStart) cell.className = "grid-cell start-node";
          else if (node.isEnd) cell.className = "grid-cell end-node";
          else cell.className = "grid-cell";
        }
      }
    }
  };

  const getNodeClassName = (node) => {
    if (node.isStart) return "grid-cell start-node";
    if (node.isEnd) return "grid-cell end-node";
    if (node.isWall) return "grid-cell wall-node";
    return "grid-cell";
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Pathfinding Visualizer</h2>
      </div>

      {running && (
        <p style={{ textAlign: 'center', marginBottom: '8px', color: '#6b7280', animation: 'pulse 1s infinite' }}>
          Running {algorithm === "astar" ? "A*/A-star" : algorithm.toUpperCase()}...
        </p>
      )}

      <div className="controls">
        <button 
          onClick={handleVisualize} 
          disabled={running} 
          className="btn btn-primary"
        >
          Start Visualization
        </button>
        <button 
          onClick={resetGrid} 
          className="btn btn-outline"
        >
          Reset Grid
        </button>
        <button 
          onClick={() => setPlacingWall(!placingWall)} 
          className={`btn ${placingWall ? 'btn-secondary' : 'btn-outline'}`}
        >
          Toggle Walls Mode
        </button>
        <select 
          value={algorithm} 
          onChange={e => setAlgorithm(e.target.value)}
          style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
        >
          <option value="dijkstra">Dijkstra</option>
          <option value="astar">A*/A-star</option>
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
        </select>
      </div>

      <div 
        className="grid-container"
        style={{ 
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
          maxWidth: 'fit-content'
        }}
      >
        {grid.map((row, rowIdx) =>
          row.map((node, nodeIdx) => (
            <div
              key={`${rowIdx}-${nodeIdx}`}
              id={`node-${node.row}-${node.col}`}
              title={
                node.isStart ? "Start Node" :
                node.isEnd ? "End Node" :
                node.isWall ? "Wall" : ""
              }
              className={getNodeClassName(node)}
              onClick={() => !running && placingWall && toggleWall(node.row, node.col)}
            ></div>
          ))
        )}
      </div>

      <div className="legend">
        🔵 Start Node &nbsp;&nbsp;&nbsp; 🔴 End Node &nbsp;&nbsp;&nbsp; ⚫ Walls (click to toggle)<br />
        🟨 Visited &nbsp;&nbsp;&nbsp; 🟩 Final Shortest Path
      </div>

      {stats && (
        <div className="stats">
          <h3>Result Summary</h3>
          {stats.success ? (
            <ul>
              <li><strong>Status:</strong> Path Found</li>
              <li><strong>Algorithm Used:</strong> {stats.used}</li>
              <li><strong>Total Nodes Visited:</strong> {stats.visited}</li>
              <li><strong>Shortest Path Length:</strong> {stats.pathLength}</li>
            </ul>
          ) : (
            <p style={{ color: '#dc2626', fontWeight: '500' }}>Status: No Path Available</p>
          )}
        </div>
      )}
    </div>
  );
} 