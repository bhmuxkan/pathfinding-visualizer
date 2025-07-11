# Pathfinding Visualizer

A clean, minimal, and interactive pathfinding visualizer built with React.

- Visualizes Dijkstra, A*, BFS, and DFS algorithms
- Simple, responsive, and beautiful UI
- Play with the grid: add/remove walls, reset, and switch algorithms

## Getting Started

```bash
npm install
npm start   # or: npm run dev
```
Open your browser at [http://localhost:1234](http://localhost:1234) (Parcel) or [http://localhost:5173](http://localhost:5173) (Vite).

## Project Structure

```
public/           # Static files
src/
  algorithms/     # Pathfinding algorithms
  components/     # UI components
  utils/          # Grid logic
  App.jsx         # Main app
  index.jsx       # Entry point
```

## Customization
- Add your own algorithms in `src/algorithms/`
- Tweak grid settings in `src/utils/grid.js`
- Style it your way in `src/index.css`

---

Made with focus, fun, and React. Enjoy exploring shortest paths! 