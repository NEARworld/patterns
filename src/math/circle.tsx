import { useEffect, useRef } from "react";
import { drawAxis, drawGrid } from "./common/coordinates";

type CommonParams = {
  ctx: CanvasRenderingContext2D;
  center: Point;
};
type Point = {
  x: number;
  y: number;
};
type Params<T> = (params: T) => any;

const coordinatesSize = {
  x: window.innerWidth,
  y: window.innerHeight,
};
const originPoint = {
  x: coordinatesSize.x / 2,
  y: coordinatesSize.y / 2,
};

const drawCircle: Params<
  Pick<CommonParams, "ctx"> & {
    point: Point;
    RADIUS: number;
    checker: { isReachedToEnd: boolean; isCircleCompleted: boolean };
  }
> = ({ ctx, point, RADIUS, checker }) => {
  const POINT_SIZE = 4;
  let { isReachedToEnd } = checker;

  const triangleHeight = Math.sqrt(RADIUS ** 2 - point.x ** 2);
  if (!isReachedToEnd) point.y = -triangleHeight;
  if (isReachedToEnd) point.y = triangleHeight;

  ctx.fillStyle = "black";
  ctx.fillRect(point.x, point.y, POINT_SIZE, POINT_SIZE);
  if (point.x <= -RADIUS) checker.isReachedToEnd = true;
  if (point.x === RADIUS && isReachedToEnd) checker.isCircleCompleted = true;
  if (!isReachedToEnd) point.x -= 0.8;
  if (isReachedToEnd) point.x += 0.8;

  if (!checker.isCircleCompleted)
    requestAnimationFrame(() => drawCircle({ ctx, point, RADIUS, checker }));
};

function Circle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log(originPoint);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      ctx?.translate(0, 0);
      ctx.font = "bold 20px serif";
      ctx.textBaseline = "top";
      ctx.textAlign = "right";
      ctx.fillText("O", originPoint.x - 5, originPoint.y + 5);
      drawAxis(ctx, coordinatesSize);
      drawGrid(ctx);

      const RADIUS = 200;
      const point = {
        x: RADIUS,
        y: 0,
      };
      const checker = {
        isReachedToEnd: false,
        isCircleCompleted: false,
      };

      ctx.translate(originPoint.x, originPoint.y);
      drawCircle({ ctx, point, RADIUS, checker });
    }
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <a href="https://github.com/NEARworld/patterns/blob/main/src/math/circle.tsx">
          github repo link
        </a>
      </div>
      <canvas
        ref={canvasRef}
        width={coordinatesSize.x}
        height={coordinatesSize.y}
      ></canvas>
    </>
  );
}

export default Circle;
