import { ColorType } from '../toolType';
import Tool, { Point, hexToRgb, updateImageData, getMousePosition } from './tool'

class Pen extends Tool {
  protected lineWidthFactor: number = 1; //线宽
  protected drawColorType = ColorType.MAIN; //
  private mouseDown = false;
  private saveImageData?: ImageData;
  private previousPos: Point = {
    x: 0,
    y: 0,
  };

  private operateStart(position: Point): void {
    if (!Tool.ctx) return;
    this.saveImageData = Tool.ctx.getImageData(0, 0, Tool.ctx.canvas.width, Tool.ctx.canvas.height);
    this.mouseDown = true;
    Tool.ctx.lineWidth = Tool.lineWidthFactor;
    Tool.ctx.strokeStyle = this.drawColorType === ColorType.MAIN ? Tool.mainColor : Tool.subColor;
    Tool.ctx.lineJoin = "round";
    Tool.ctx.lineCap = "round";
    Tool.ctx.beginPath();
    this.previousPos = position;
  }
  private operateMove(position: Point): void {
    if (this.mouseDown) {
      Tool.ctx.moveTo(this.previousPos.x, this.previousPos.y);
      const c = 0.5 * (this.previousPos.x + position.x);
      const d = 0.5 * (this.previousPos.y + position.y);
      Tool.ctx.quadraticCurveTo(c, d, position.x, position.y);
      Tool.ctx.stroke();
      this.previousPos = position;
    }
  }
  private operateEnd(): void {
    if (this.mouseDown) {
      Tool.ctx.closePath();
      this.mouseDown = false;
      let imageData = Tool.ctx.getImageData(0, 0, Tool.ctx.canvas.width, Tool.ctx.canvas.height);
      const colorRgb = hexToRgb(this.drawColorType === ColorType.MAIN ? Tool.mainColor : Tool.subColor);
      if (colorRgb && this.saveImageData) {
        imageData = updateImageData(this.saveImageData, imageData, colorRgb);
        Tool.ctx.putImageData(imageData, 0, 0);
      }
    }
  }
  public onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    const mousePos = getMousePosition(Tool.ctx.canvas,event);
    this.operateStart(mousePos);
  }
  public onMouseUp(event: MouseEvent): void {
    event.preventDefault();
    this.operateEnd();
  }
  public onMouseMove(event: MouseEvent): void {
    event.preventDefault();
    const mousePos = getMousePosition(Tool.ctx.canvas,event);
    this.operateMove(mousePos);
  }
  public onTouchStart(event: TouchEvent): void { }
  public onTouchMove(event: TouchEvent): void { }
  public onTouchEnd(event: TouchEvent): void { }
}
export default Pen;