export type Point<T> = (x: T, y: T) => void;
export type CoordinatesSize = {
  x: number;
  y: number;
};

export function drawAxis(
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

export function drawGrid(ctx: CanvasRenderingContext2D) {
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
