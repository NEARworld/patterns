import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";

function drawTile(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  width: number,
  angle: number
) {
  const rect_y = (size - width) / 2 + y;
  const center_x = x + size / 2;
  const center_y = rect_y + width / 2;

  ctx.fillStyle =
    "rgb(" +
    255 * Math.random() +
    "," +
    255 * Math.random() +
    "," +
    255 * Math.random() +
    ")";
  ctx.translate(center_x, center_y);
  ctx.rotate(angle);
  ctx.translate(-center_x, -center_y);
  ctx.fillRect(x, rect_y, size, width);

  ctx.resetTransform();

  // requestAnimationFrame(() => {
  //   drawTile(ctx, x, y, size, width, angle);
  // });
}
export default function Home() {
  const navigation = useNavigate();
  const outlet = useOutlet();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSizeState, setCanvasSizeState] = useState({
    width: document.body.clientWidth / 2,
    height: document.body.clientWidth / 2,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && !outlet) {
      ctx.clearRect(0, 0, canvasSizeState.width, canvasSizeState.height);
      const TILE_COUNT = 32;
      const TILE_WIDTH = ctx.canvas.width / TILE_COUNT;
      const TILE_HEIGHT = ctx.canvas.height / TILE_COUNT;

      requestAnimationFrame(() => {
        (() => {
          for (let x = 0; x < TILE_COUNT; ++x) {
            for (let y = 0; y < TILE_COUNT; ++y) {
              drawTile(
                ctx,
                TILE_WIDTH * x,
                TILE_HEIGHT * y,
                TILE_WIDTH,
                (y / TILE_COUNT) * TILE_HEIGHT,
                (x / TILE_COUNT) * -Math.PI + (y / TILE_COUNT) * -Math.PI
              );
            }
          }
        })();
      });
    }
  }, [outlet]);

  return (
    <div>
      <div>
        <button onClick={() => navigation("/")}>home</button>
        <button onClick={() => navigation("blinking_squares")}>
          blinking squares
        </button>
        <button onClick={() => navigation("parabola")}>parabola</button>
      </div>

      {outlet ? (
        <Outlet />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <a href="https://github.com/NEARworld/patterns/blob/main/src/home.tsx">
            github repo link
          </a>
          <canvas
            ref={canvasRef}
            width={canvasSizeState.width}
            height={canvasSizeState.height}
          />
        </div>
      )}
    </div>
  );
}
