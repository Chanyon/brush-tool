import { createContext } from 'react';
import { ColorType, ToolType } from '../util/toolType';

export const ToolTypeContext = createContext({
  type: ToolType.PEN,
  setType: (type: ToolType) => {},
});

export const ColorContext = createContext({
  mainColor: "black",
  subColor: "white",
  activeColor: ColorType.MAIN,
  setColor: (value: string) => {},
  setActiveColor: (type: ColorType) => {},
});