import { FC, useEffect, useRef, useState } from "react";
import './index.css'
import { Pen } from "../../util/tool";
import Tool from "../../util/tool/tool";
import { ToolType } from "../../util/toolType";
interface CanvasProps {
  toolType: ToolType,
  mainColor: string,
  subColor: string,
}
const Canvas:FC<CanvasProps> = (props) => {
  const {toolType, mainColor, subColor} = props;
  const [tool,setTool] = useState<Tool>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 工具
  useEffect(()=>{
    switch (toolType) {
      case ToolType.PEN:
        setTool(new Pen())
        break;
      default:
        break;
    }
  },[toolType]);

  // color
  useEffect(()=>{
    Tool.mainColor = mainColor;
  },[mainColor]);
  useEffect(()=>{
    Tool.subColor = subColor;
  },[subColor]);

  // canvas 
  useEffect(()=>{
    const canvas = canvasRef.current;
    if(canvas) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      Tool.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    }
  },[canvasRef]);

  const onMouseDown = (event: MouseEvent) => {
    if(tool) {
      tool.onMouseDown(event);
    }
  };
  const onMouseUp = (event: MouseEvent) => {
    if(tool) {
      tool.onMouseUp(event);
    }
  };
  const onMouseMove = (event: MouseEvent) => {
    if(tool) {
      tool.onMouseMove(event);
    }
  };
  // event
  useEffect(()=>{
    const canvas = canvasRef.current;
    if(canvas) {
      canvas.addEventListener("mousedown", onMouseDown);
      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mouseup", onMouseUp);
    }
    return () =>{
      canvas!.addEventListener("mousedown", onMouseDown);
      canvas!.addEventListener("mousemove", onMouseMove);
      canvas!.addEventListener("mouseup", onMouseUp);
    }
  },[canvasRef,onMouseDown,onMouseUp,onMouseMove]);
  return (
      <canvas className="canvas" ref={canvasRef}></canvas>
    )
};

export default Canvas;