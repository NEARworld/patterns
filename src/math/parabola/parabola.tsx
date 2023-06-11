import { useEffect, useRef, useState } from "react";
import {
  type CoordinatesSize,
  type Point,
  drawAxis,
  drawGrid,
} from "../common/coordinates";

const DIRECTRIX = 40;

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

function animatePointsOnParabola(
  ctx: CanvasRenderingContext2D,
  originPoint: CoordinatesSize,
  coordinatesSize: CoordinatesSize,
  x: number
) {
  let point = { x: 0, y: 0 };
  let p = DIRECTRIX;
  point.x = originPoint.x + x;
  point.y = originPoint.y - Math.sqrt(4 * p * x);
  ctx.fillRect(point.x, point.y, 1, 1);

  point.y = originPoint.y + Math.sqrt(4 * p * x);
  ctx.fillRect(point.x, point.y, 1, 1);
  x++;

  if (x === ctx.canvas.width) x = 0;

  requestAnimationFrame(() =>
    animatePointsOnParabola(ctx, originPoint, coordinatesSize, x)
  );
}

function Parabola() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [coordinatesSize, setCoordniateSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  // const coordinatesSize = {
  //   x: window.innerWidth,
  //   y: window.innerHeight,
  // };
  const originPoint = {
    x: coordinatesSize.x / 2,
    y: coordinatesSize.y / 2,
  };

  // useEffect(() => {
  //   const updateCoordinatesSize = () => {
  //     setCoordniateSize({
  //       x: window.innerWidth,
  //       y: window.innerHeight,
  //     });
  //   };
  //   window.addEventListener("resize", updateCoordinatesSize);

  //   return () => {
  //     window.removeEventListener("resize", updateCoordinatesSize);
  //   };
  // }, [coordinatesSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      // drawPointsOnParabola(ctx, originPoint);

      // animate the parabola graph
      let x = 0;

      animatePointsOnParabola(ctx, originPoint, coordinatesSize, x);
    }
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <a href="https://github.com/NEARworld/patterns/blob/main/src/math/parabola/parabola.tsx">
          github repo link
        </a>
      </div>
      <canvas
        id={"parabola"}
        ref={canvasRef}
        width={coordinatesSize.x}
        height={coordinatesSize.y}
      ></canvas>
    </>
  );
}

export default Parabola;
