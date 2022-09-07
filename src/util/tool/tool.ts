
export default class Tool {
  public static lineWidthFactor: number = 1; //线宽
  public static mainColor: string = "#000000"; //
  public static subColor: string = "#ffffff";
  public static ctx: CanvasRenderingContext2D;

  public onMouseDown(event: MouseEvent): void {}
  public onMouseUp(event: MouseEvent): void {}
  public onMouseMove(event: MouseEvent): void {}
  public onTouchStart(event: TouchEvent): void {}
  public onTouchMove(event: TouchEvent): void {}
  public onTouchEnd(event: TouchEvent): void {}
}

export interface Point{
  x: number;
  y: number;
}

export const getMousePosition = (canvas: HTMLCanvasElement, event: MouseEvent): Point => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }
}

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1],16),
    g: parseInt(result[2],16),
    b: parseInt(result[3],16),
    a: parseInt(result[4],16),
  } : null;
}

type Rgba = {
  r: number,
  g: number,
  b: number,
  a: number,
}

export const updateImageData = (origin: ImageData, mut_data: ImageData,fillData: Rgba) => {
  for (let row = 0; row < mut_data.height; row++) {
    for (let col = 0; col < mut_data.width; col++) {
      const index = row * mut_data.width * 4 + col * 4;
      const r1 = mut_data.data[index];
      const g1 = mut_data.data[index + 1];
      const b1 = mut_data.data[index + 2];
      const a1 = mut_data.data[index + 3];

      const r2 = origin.data[index];
      const g2 = origin.data[index + 1];
      const b2 = origin.data[index + 2];
      const a2 = origin.data[index + 3];

      const equalOrigin = r1 === r2 && g1 === g2 && b1 === b2 && a1 === a2;
      const equalFilling = r1 === fillData.r && g1 === fillData.g && b1 === fillData.b && a1 === fillData.a;
      if(!(equalOrigin || equalFilling)) {
        mut_data.data[index] = fillData.r;
        mut_data.data[index + 1] = fillData.g;
        mut_data.data[index + 2] = fillData.b;
        mut_data.data[index + 3] = fillData.a;
      }
    }
  }
  return mut_data;
}
