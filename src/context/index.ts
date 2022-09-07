import { createContext } from 'react';
import { ToolType } from '../util/toolType';

export const ToolTypeContext = createContext({
  type: ToolType.PEN,
  setType: (type: ToolType) => {},
});