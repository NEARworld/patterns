import { useEffect, useRef, useState } from "react";
import { getTotalShapeAmount } from "../../methods";

type Shape = "rectangle" | "circle" | "triangle";
type ShapeOptions = {
  shape: Shape;
  width: number;
  height: number;
  color: string;
};
const TEMPLATE_LITERALS_RGBA = () =>
  `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  }, 0.5)`;

function generatePattern(
  canvasCtx: CanvasRenderingContext2D,
  rowColumn: number,
  { shape, width, height, color }: ShapeOptions
) {
  // clean the canvas when changing code.
  canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.width);
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

  requestAnimationFrame(() =>
    generatePattern(canvasCtx, rowColumn, {
      shape,
      width,
      height,
      color: TEMPLATE_LITERALS_RGBA(),
    })
  );
}

export type CanvasSize = {
  width: number;
  height: number;
};

const SHAPE_WIDTH_HEIGHT = 100;
const GAP = 10;

export default function SquaresBasicPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSizeState, setCanvasSizeState] = useState({
    width: document.body.clientWidth / 2,
    height: document.body.clientWidth / 2,
  });
  // const CANVAS_SIZE = {
  //   width: document.body.clientWidth / 2,
  //   height: document.body.clientWidth / 2,
  // };

  useEffect(() => {
    const adjustCanvasSize = () => {
      setCanvasSizeState({
        width: document.body.clientWidth / 2,
        height: document.body.clientWidth / 2,
      });
    };
    window.addEventListener("resize", adjustCanvasSize);

    const canvasCtx = canvasRef.current?.getContext("2d");
    if (canvasCtx) {
      requestAnimationFrame(() =>
        generatePattern(
          canvasCtx,
          getTotalShapeAmount(canvasSizeState, SHAPE_WIDTH_HEIGHT, GAP),
          {
            shape: "rectangle",
            width: SHAPE_WIDTH_HEIGHT,
            height: SHAPE_WIDTH_HEIGHT,
            color: TEMPLATE_LITERALS_RGBA(),
          }
        )
      );
    }

    return () => {
      window.removeEventListener("resize", adjustCanvasSize);
    };
  }, [canvasSizeState]);

  console.log(
    (canvasSizeState.width % SHAPE_WIDTH_HEIGHT) / SHAPE_WIDTH_HEIGHT
  );

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Try resizing the window!</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
          marginLeft:
            canvasSizeState.width -
            (getTotalShapeAmount(canvasSizeState, SHAPE_WIDTH_HEIGHT, GAP) *
              SHAPE_WIDTH_HEIGHT +
              (getTotalShapeAmount(canvasSizeState, SHAPE_WIDTH_HEIGHT, GAP) -
                1) *
                GAP),
        }}
      >
        <canvas
          ref={canvasRef}
          width={canvasSizeState.width}
          height={canvasSizeState.height}
        />
      </div>
    </>
  );
}
