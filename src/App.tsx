import { createContext, useContext } from 'react';
import { useState } from 'react'
import './App.css'
import Canvas from './components/canvas';
import ToolBar from './components/toolBar';
import { ColorContext, ToolTypeContext } from './context';
import { ColorType, ToolType } from './util/toolType';

function App() {
  const [toolType, setToolType] = useState<ToolType>(ToolType.PEN);
  const [activeColorType,setActiveColorType] = useState<ColorType>(ColorType.MAIN);
  const [mainColor,setMainColor] = useState<string>("black");
  const [subColor,setSubColor] = useState<string>("white");

  const setColor = (value: string) => {
    if(activeColorType === ColorType.MAIN) {
      setMainColor(value);
    }else {
      setSubColor(value);
    }
  };
  return (
    <ToolTypeContext.Provider value={{ type: toolType, setType: setToolType }}>
      <ColorContext.Provider value={{
        mainColor,
        subColor,
        activeColor: activeColorType,
        setColor,
        setActiveColor: setActiveColorType,
      }}>
        <div className="App">
          <ToolBar></ToolBar>
          <Canvas toolType={toolType} mainColor={mainColor} subColor={subColor} />
        </div>
      </ColorContext.Provider>
    </ToolTypeContext.Provider>
  )
}



export default App
