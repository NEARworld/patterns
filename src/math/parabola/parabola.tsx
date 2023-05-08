import { useEffect, useRef } from "react";

type Point<T> = (x: T, y: T) => void;
type CoordinatesSize = {
  x: number;
  y: number;
};

const DIRECTRIX = 40;
function drawAxis(
  ctx: CanvasRenderingContext2D,
  coordinatesSize: CoordinatesSize
) {
  // draw X axis
  ctx.beginPath();
  ctx.moveTo(0, coordinatesSize.y / 2);
  ctx.lineTo(coordinatesSize.x, coordinatesSize.y / 2);
  ctx.stroke();
  // draw Y axis
  ctx.beginPath();
  ctx.moveTo(coordinatesSize.x / 2, 0);
  ctx.lineTo(coordinatesSize.x / 2, coordinatesSize.y);
  ctx.stroke();
}
function drawGrid(ctx: CanvasRenderingContext2D) {
  // vertical grid
  for (let i = 0; i < ctx.canvas.width / 2; i += 10) {
    ctx.beginPath();
    ctx.setLineDash([1, 1]);
    ctx.moveTo(ctx.canvas.width / 2 - i, 0);
    ctx.lineTo(ctx.canvas.width / 2 - i, ctx.canvas.height);
    ctx.moveTo(ctx.canvas.width / 2 + i, 0);
    ctx.lineTo(ctx.canvas.width / 2 + i, ctx.canvas.height);
    ctx.stroke();
  }
  // horizontal grid
  for (let i = 0; i < ctx.canvas.height / 2; i += 10) {
    ctx.beginPath();
    ctx.moveTo(0, ctx.canvas.height / 2 - i);
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2 - i);
    ctx.moveTo(0, ctx.canvas.height / 2 + i);
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2 + i);
    ctx.stroke();
  }
  // change line style to solid line
  ctx.setLineDash([]);
}

function drawDirectrix(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(ctx.canvas.width / 2 - DIRECTRIX, 0);
  ctx.lineTo(ctx.canvas.width / 2 - DIRECTRIX, ctx.canvas.height);
  ctx.stroke();
}
function drawPointsOnParabola(
  ctx: CanvasRenderingContext2D,
  originPoint: CoordinatesSize
) {
  let point = { x: 0, y: 0 };
  let p = DIRECTRIX;
  for (let x = 0; x <= ctx.canvas.width; x += 1) {
    point.x = originPoint.x + x;
    point.y = originPoint.y - Math.sqrt(4 * p * x);
    ctx.fillRect(point.x, point.y, 1, 1);

    point.y = originPoint.y + Math.sqrt(4 * p * x);
    ctx.fillRect(point.x, point.y, 1, 1);
  }
}

function Parabola() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const coordinatesSize = {
    x: document.body.clientWidth,
    y: document.body.clientHeight,
  };
  const originPoint = {
    x: coordinatesSize.x / 2,
    y: coordinatesSize.y / 2,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      const point: Point<number> = (x, y) => {
        ctx.fillRect(x - 2, y - 2, 4, 4);
      };

      ctx.font = "bold 20px serif";
      ctx.textBaseline = "top";
      ctx.textAlign = "right";
      ctx.fillText("O", originPoint.x - 5, originPoint.y + 5);
      drawAxis(ctx, coordinatesSize);
      drawGrid(ctx);

      // draw the origin point.
      point(originPoint.x, originPoint.y);
      // draw the focus point.
      point(originPoint.x + DIRECTRIX, originPoint.y);
      drawDirectrix(ctx);
      drawPointsOnParabola(ctx, originPoint);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={coordinatesSize.x}
      height={coordinatesSize.y}
    ></canvas>
  );
}

export default Parabola;
