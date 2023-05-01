import { useEffect, useRef } from "react";
import "./App.css";

type Shape = "rectangle" | "circle" | "triangle";
type ShapeOptions = {
  shape: Shape;
  width: number;
  height: number;
  color: string;
};

const CONCATENATED_RGBA =
  "rgba(" +
  Math.random() * 255 +
  "," +
  Math.random() * 255 +
  "," +
  Math.random() * 255 +
  "," +
  1 +
  ")";
const TEMPLATE_LITERALS_RGBA = `rgba(${Math.random() * 255}, ${
  Math.random() * 255
}, ${Math.random() * 255}, 0.5})`;

function generatePattern(
  canvasCtx: CanvasRenderingContext2D,
  rowColumn: number,
  { shape, width, height, color }: ShapeOptions
) {
  canvasCtx.clearRect(
    0,
    0,
    document.body.clientWidth,
    document.body.clientHeight
  );
  canvasCtx.fillStyle = color;

  for (let i = 0; i < rowColumn; i++) {
    for (let j = 0; j < rowColumn; j++) {
      if (shape === "rectangle")
        canvasCtx.fillRect(
          i * width + i * 10,
          j * height + j * 10,
          width,
          height
        );
    }
  }

  const CONCATENATED_RGBA =
    "rgba(" +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    "," +
    Math.random() +
    ")";
  // requestAnimationFrame(() => generatePattern(canvasCtx, 30, {shape: 'rectangle', width: 50, height: 50, color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5})`}));
  requestAnimationFrame(() =>
    generatePattern(canvasCtx, 30, {
      shape: "rectangle",
      width: 50,
      height: 50,
      color: CONCATENATED_RGBA,
    })
  );
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvasCtx = canvasRef.current?.getContext("2d");
    if (canvasCtx) {
      requestAnimationFrame(() =>
        generatePattern(canvasCtx, 30, {
          shape: "rectangle",
          width: 50,
          height: 50,
          color: CONCATENATED_RGBA,
        })
      );
    }
  }, []);
  return (
    <canvas
      ref={canvasRef}
      width={document.body.clientWidth}
      height={document.body.clientHeight}
    />
  );
}

export default App;
