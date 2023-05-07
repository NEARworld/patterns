import { type CanvasSize } from "./patterns/squares/basic";

export const getTotalShapeAmount = (
  canvasSize: CanvasSize,
  shapeSize: number,
  gap: number
) => {
  const totalGap = (canvasSize.width / shapeSize - 1) * gap;
  return Math.floor((canvasSize.width - totalGap) / shapeSize);
};
